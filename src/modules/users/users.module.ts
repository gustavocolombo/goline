import { MailerModule } from '@nestjs-modules/mailer';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { RolesGuard } from '../../shared/roles/roles-guard';
import { AuthenticateUsersService } from '../auth/services/authenticate-user-service';
import { UsersController } from './controllers/users.controller';
import { CreateUserService } from './services/create-user-service';
import { GetInfoUserService } from './services/get-info-user-service';
import { ResetPasswordService } from './services/reset-password-service';
import { SoftDeleteUserService } from './services/soft-delete-user-service';
import { UpdateUserService } from './services/update-user-service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST_ETHEREAL,
        port: Number(process.env.SMTP_PORT_ETHEREAL),
        auth: {
          user: process.env.SMTP_AUTH_USER_ETHEREAL,
          pass: process.env.SMTP_AUTH_PASS_ETHEREAL,
        },
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    PrismaService,
    CreateUserService,
    AuthenticateUsersService,
    UpdateUserService,
    GetInfoUserService,
    SoftDeleteUserService,
    ResetPasswordService,
    { provide: APP_GUARD, useClass: RolesGuard },
    Logger,
  ],
})
export class UsersModule {}
