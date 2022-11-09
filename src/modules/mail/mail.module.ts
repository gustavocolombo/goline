import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { SendMailWithTokenService } from '../auth/infra/services/prisma/SendMailWithTokenService';
import { MailController } from './infra/http/mail/mail.controller';
import SendEmailWithTokenForRecoverPasswordService from './infra/services/SendEmailWithTokenForRecoverPasswordService';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.SMTP_HOST_ETHEREAL,
          port: Number(process.env.SMTP_PORT_ETHEREAL),
          auth: {
            user: process.env.SMTP_AUTH_USER_ETHEREAL,
            pass: process.env.SMTP_AUTH_PASS_ETHEREAL,
          },
        },
      }),
    }),
  ],
  providers: [
    SendMailWithTokenService,
    SendEmailWithTokenForRecoverPasswordService,
    PrismaService,
  ],
  controllers: [MailController],
})
export class MailModule {}
