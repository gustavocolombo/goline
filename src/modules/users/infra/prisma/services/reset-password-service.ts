import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import ErrorHandling from '../../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { IResetPasswordDTO } from '../../../dtos/IResetPasswordDTO';

@Injectable()
export class ResetPasswordService {
  constructor(private prismaService: PrismaService) {}

  async execute({ email, new_password }: IResetPasswordDTO): Promise<Users> {
    try {
      const user = await this.prismaService.users.findFirst({
        where: { email },
        select: {
          password: true,
        },
      });

      if (!user) throw new BadRequestException('User not found!');

      const newPasswordHashed = await hash(new_password, 8);

      if (await compare(new_password, user.password)) {
        console.log('entrou no if');
        throw new BadRequestException(
          'The new password can not be the same as previous one',
        );
      }

      const updatedUser = await this.prismaService.users.update({
        where: { email },
        data: { password: newPasswordHashed },
      });

      delete updatedUser.password;

      return updatedUser;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
