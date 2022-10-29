import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { ensureAuthenticatedMiddleware } from '../../shared/middlewares/ensureAuthenticatedMiddleware';
import { DressmakerController } from './infra/http/express/controller/dressmaker.controller';
import { DressmakingController } from './infra/http/express/controller/dressmaking.controller';
import { SendMailDressmakerConsumerService } from './infra/jobs/send-mail-dressmaker-consumer.service';
import { SendMailDressmakerProducerService } from './infra/jobs/send-mail-dressmaker-producer.service';
import { CreateDressmakerService } from './infra/services/prisma/create-dressmaker-service';
import { CreateDressmakingService } from './infra/services/prisma/create-dressmaking-service';
import { GetDressmakingsService } from './infra/services/prisma/get-dressmakings-service';
import { GrabDressmakingService } from './infra/services/prisma/grab-dressmaking-service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
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
    BullModule.registerQueue({
      name: 'send-mail-queue-dressmaker',
    }),
  ],
  providers: [
    PrismaService,
    CreateDressmakerService,
    CreateDressmakingService,
    GetDressmakingsService,
    GrabDressmakingService,
    SendMailDressmakerProducerService,
    SendMailDressmakerConsumerService,
  ],
  controllers: [DressmakerController, DressmakingController],
})
export class DressmakerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthenticatedMiddleware)
      .forRoutes({ path: '/dressmaking', method: RequestMethod.ALL });
  }
}
