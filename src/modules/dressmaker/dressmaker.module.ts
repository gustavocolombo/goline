import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DressmakerController } from './infra/http/express/controller/dressmaker.controller';
import { DressmakingController } from './infra/http/express/controller/dressmaking.controller';
import { SendMailDressmakerConsumerService } from './infra/jobs/send-mail-dressmaker-consumer.service';
import { SendMailDressmakerProducerService } from './infra/jobs/send-mail-dressmaker-producer.service';
import { CreateDressmakerService } from './infra/prisma/services/create-dressmaker-service';
import { CreateDressmakingService } from './infra/prisma/services/create-dressmaking-service';

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
    SendMailDressmakerProducerService,
    SendMailDressmakerConsumerService,
  ],
  controllers: [DressmakerController, DressmakingController],
})
export class DressmakerModule {}
