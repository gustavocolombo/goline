import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DressmakerController } from './infra/http/express/controller/dressmaker.controller';
import { DressmakingController } from './infra/http/express/controller/dressmaking.controller';
import { CreateDressmakerService } from './infra/services/prisma/create-dressmaker-service';
import { CreateDressmakingService } from './infra/services/prisma/create-dressmaking-service';
import { GetAllDressmakingService } from './infra/services/prisma/get-all-dressmaking';
import { GetDressmakerService } from './infra/services/prisma/get-dressmaker-service';
import { GetDressmakingsService } from './infra/services/prisma/get-dressmakings-service';
import { GrabDressmakingService } from './infra/services/prisma/grab-dressmaking-service';
import { SoftDeleteDressmakerService } from './infra/services/prisma/soft-delete-dressmaker-service';
import { UpdateDressmakerService } from './infra/services/prisma/update-dressmaker-service';
import { SendMailConsumerDressmakerService } from './jobs/bull/send-mail-consumer.service';
import { SendMailProducerDressmakerService } from './jobs/bull/send-mail-producer.service';

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
        host: process.env.SMTP_HOST_ETHEREAL,
        port: Number(process.env.SMTP_PORT_ETHEREAL),
        auth: {
          user: process.env.SMTP_AUTH_USER_ETHEREAL,
          pass: process.env.SMTP_AUTH_PASS_ETHEREAL,
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
    SendMailConsumerDressmakerService,
    SendMailProducerDressmakerService,
    GetAllDressmakingService,
    GetDressmakerService,
    UpdateDressmakerService,
    SoftDeleteDressmakerService,
  ],
  controllers: [DressmakerController, DressmakingController],
})
export class DressmakerModule {}
