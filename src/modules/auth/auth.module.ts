import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import SendEmailWithTokenForRecoverPasswordService from '@mail/infra/services/SendEmailWithTokenForRecoverPasswordService';
import SendEmailConfirmRecoverPasswordService from '@mail/infra/services/SendMailWithTokenService';
import { AuthController } from '@auth/controllers/auth.controller';
import { AuthenticateUsersService } from '@auth/services/AuthenticateUser.service';
import RedefinePasswordService from '@auth/services/RedefinePassword.service';
import { SendMailWithTokenService } from '@auth/services/SendMailWithToken.service';
import { DressmakerRepository } from '../dressmaker/repositories/dressmakers.repository';
import { UsersRepository } from '../users/repositories/users.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthenticateUsersService,
    Logger,
    RedefinePasswordService,
    SendMailWithTokenService,
    SendEmailConfirmRecoverPasswordService,
    SendEmailWithTokenForRecoverPasswordService,
    DressmakerRepository,
    UsersRepository,
  ],
})
export class AuthModule {}
