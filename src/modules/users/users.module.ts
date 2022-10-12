import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { AuthenticateUsersService } from '../auth/infra/prisma/services/AuthenticateUserService';
import { UsersController } from './infra/http/express/controllers/users.controller';
import { SendMailConsumerService } from './infra/jobs/bull/send-mail-consumer.service';
import { SendMailProducerService } from './infra/jobs/bull/send-mail-producer.service';
import { CreateUserService } from './infra/prisma/services/CreateUserService';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'send-mail-queue',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_AUTH_USER,
          pass: process.env.SMTP_AUTH_PASS,
        },
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    PrismaService,
    CreateUserService,
    AuthenticateUsersService,
    SendMailProducerService,
    SendMailConsumerService,
    Logger,
  ],
})
export class UsersModule {}
