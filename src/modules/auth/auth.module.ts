import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import SendEmailWithTokenForRecoverPasswordService from '@mail/infra/services/SendEmailWithTokenForRecoverPasswordService';
import SendEmailConfirmRecoverPasswordService from '@mail/infra/services/SendMailWithTokenService';
import { AuthController } from '@auth/controllers/auth.controller';
import { AuthenticateUsersService } from '@auth/services/authenticate-user-service';
import RedefinePasswordService from '@auth/services/redefine-password-service';
import { SendMailWithTokenService } from '@auth/services/send-mail-with-token-service';

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
  ],
})
export class AuthModule {}
