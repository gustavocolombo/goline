import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { ensureAuthenticatedMiddleware } from '../../shared/middlewares/ensureAuthenticatedMiddleware';
import { AuthenticateUsersService } from '../auth/infra/prisma/services/AuthenticateUserService';
import { UsersController } from './infra/http/express/controllers/users.controller';
import { SendMailConsumerService } from './infra/jobs/bull/send-mail-consumer.service';
import { SendMailProducerService } from './infra/jobs/bull/send-mail-producer.service';
import { CreateUserService } from './infra/prisma/services/CreateUserService';
import { GetInfoUserService } from './infra/prisma/services/get-info-user-service';
import { ResetPasswordService } from './infra/prisma/services/reset-password-service';
import { SoftDeleteUserService } from './infra/prisma/services/soft-delete-user-service';
import { UpdateUserService } from './infra/prisma/services/update-user-service';

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
    UpdateUserService,
    GetInfoUserService,
    SoftDeleteUserService,
    ResetPasswordService,
    SendMailProducerService,
    SendMailConsumerService,
    Logger,
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthenticatedMiddleware)
      .forRoutes({ path: '/users', method: RequestMethod.GET });
  }
}
