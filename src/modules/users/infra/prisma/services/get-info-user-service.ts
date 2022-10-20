import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import ErrorHandling from '../../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { IGetUserInfoDTO } from '../../../dtos/IGetUserInfoDTO';

@Injectable()
export class GetInfoUserService {
  constructor(private prismaService: PrismaService) {}

  async execute({ user_id }: IGetUserInfoDTO): Promise<Users | undefined> {
    try {
      const user = await this.prismaService.users.findFirst({
        where: { id: user_id },
      });

      delete user.password;

      return user;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
