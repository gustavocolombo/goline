import { BadRequestException, Injectable } from '@nestjs/common';
import { StatusUser, Users } from '@prisma/client';
import ErrorHandling from '../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../shared/infra/prisma/prisma.service';
import { SoftDeleteUserDTO } from '../../dtos/SoftDeleteUserDTO';

@Injectable()
export class SoftDeleteUserService {
  constructor(private prismaService: PrismaService) {}

  async execute({ email }: SoftDeleteUserDTO): Promise<Users> {
    try {
      const user = await this.prismaService.users.findFirst({
        where: { email },
      });

      if (!user) throw new BadRequestException('User not found!');

      const updatedUser = await this.prismaService.users.update({
        data: { status: StatusUser.INACTIVE },
        where: { email },
      });

      return updatedUser;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
