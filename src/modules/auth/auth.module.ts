import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import SendEmailWithTokenForRecoverPasswordService from '../mail/infra/services/SendEmailWithTokenForRecoverPasswordService';
import SendEmailConfirmRecoverPasswordService from '../mail/infra/services/SendMailWithTokenService';
import { AuthController } from './infra/http/express/controllers/auth.controller';
import { AuthenticateUsersService } from './infra/services/prisma/authenticate-user-service';
import RedefinePasswordService from './infra/services/prisma/redefine-password-service';
import { SendMailWithTokenService } from './infra/services/prisma/send-mail-with-token-service';

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
