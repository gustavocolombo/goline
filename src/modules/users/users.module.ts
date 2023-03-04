import { MailerModule } from '@nestjs-modules/mailer';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { RolesGuard } from '@shared/roles/roles-guard';
import { AuthenticateUsersService } from '@auth/services/AuthenticateUser.service';
import { UsersController } from '@users/controllers/users.controller';
import { UsersRepository } from '@users/repositories/users.repository';
import { CreateUserService } from '@users/services/CreateUser.service';
import { GetInfoUserService } from '@users/services/GetInfoUser.service';
import { ResetPasswordService } from '@users/services/ResetPassword.service';
import { SoftDeleteUserService } from '@users/services/SoftDeleteUser.service';
import { UpdateUserService } from '@users/services/UpdateUser.service';

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
    UsersRepository,
  ],
})
export class UsersModule {}
