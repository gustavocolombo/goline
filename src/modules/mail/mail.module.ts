import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './infra/http/mail/mail.controller';

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
  providers: [],
  controllers: [MailController],
})
export class MailModule {}
