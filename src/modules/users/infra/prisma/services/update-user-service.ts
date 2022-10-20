import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import ErrorHandling from '../../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { IUpdateUserDTO } from '../../../dtos/IUpdateUserDTO';

@Injectable()
export class UpdateUserService {
  constructor(private prismaService: PrismaService) {}

  async execute({ ...rest }: IUpdateUserDTO): Promise<Users> {
    try {
      const user = await this.prismaService.users.findFirst({
        where: { email: rest.email },
      });

      if (!user) throw new BadRequestException('User not found!');

      const updatedUser = await this.prismaService.users.update({
        data: {
          ...rest,
        },
        where: {
          email: user.email,
        },
      });

      return updatedUser;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
