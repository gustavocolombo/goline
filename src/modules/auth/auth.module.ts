import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import SendEmailWithTokenForRecoverPasswordService from '../mail/infra/services/SendEmailWithTokenForRecoverPasswordService';
import SendEmailConfirmRecoverPasswordService from '../mail/infra/services/SendMailWithTokenService';
import { AuthController } from './controllers/auth.controller';
import { AuthenticateUsersService } from './services/authenticate-user-service';
import RedefinePasswordService from './services/redefine-password-service';
import { SendMailWithTokenService } from './services/send-mail-with-token-service';

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
