import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DressmakerController } from './controllers/dressmaker.controller';
import { DressmakingController } from './controllers/dressmaking.controller';
import { CreateDressmakerService } from './services/create-dressmaker-service';
import { CreateDressmakingService } from './services/create-dressmaking-service';
import { GetAllDressmakersInsideGeolocation } from './services/get-all-dressmakers-inside-geolocation';
import { GetAllDressmakingService } from './services/get-all-dressmaking';
import { GetDistanceBetweenUserDressmakerService } from './services/get-distance-between-user-dressmaker-service';
import { GetDressmakerService } from './services/get-dressmaker-service';
import { GetDressmakingsService } from './services/get-dressmakings-service';
import { GrabDressmakingService } from './services/grab-dressmaking-service';
import { SoftDeleteDressmakerService } from './services/soft-delete-dressmaker-service';
import { UpdateDressmakerService } from './services/update-dressmaker-service';

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
  providers: [
    PrismaService,
    CreateDressmakerService,
    CreateDressmakingService,
    GetDressmakingsService,
    GrabDressmakingService,
    GetAllDressmakingService,
    GetDressmakerService,
    UpdateDressmakerService,
    SoftDeleteDressmakerService,
    GetAllDressmakersInsideGeolocation,
    GetDistanceBetweenUserDressmakerService,
  ],
  controllers: [DressmakerController, DressmakingController],
})
export class DressmakerModule {}
