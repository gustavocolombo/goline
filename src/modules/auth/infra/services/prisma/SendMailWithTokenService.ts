import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersToken } from '@prisma/client';
import { addDays } from 'date-fns';
import ErrorHandling from '../../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import SendEmailWithTokenForRecoverPasswordService from '../../../../mail/infra/services/SendEmailWithTokenForRecoverPasswordService';
import SendEmailWithTokenDTO from '../../../dtos/SendEmailWithTokenDTO';

@Injectable()
export class SendMailWithTokenService {
  constructor(
    private prismaService: PrismaService,
    private sendMailWithTokenService: SendEmailWithTokenForRecoverPasswordService,
  ) {}

  async execute({ email }: SendEmailWithTokenDTO) {
    try {
      const user = await this.prismaService.users.findFirst({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('This user does not exists in database');
      }

      const lastToken: UsersToken =
        await this.prismaService.usersToken.findFirst({
          where: { users_id: user.id },
          orderBy: { created_at: 'desc' },
        });

      if (lastToken && !lastToken.used && lastToken.used_in === null) {
        await this.sendMailWithTokenService.execute({
          user,
          token: lastToken.token,
        });

        return lastToken;
      } else {
        const expires_in: Date = addDays(new Date(), 7);

        const token: UsersToken = await this.prismaService.usersToken.create({
          data: {
            users_id: user.id,
            expires_in,
          },
        });

        await this.sendMailWithTokenService.execute({
          user,
          token: token.token,
        });

        return token;
      }
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
