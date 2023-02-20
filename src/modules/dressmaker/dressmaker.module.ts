import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { UsersRepository } from '@users/repositories/users.repository';
import { DressmakerController } from '@dressmaker/controllers/dressmaker.controller';
import { DressmakerRepository } from '@dressmaker/repositories/dressmakers.repository';
import { CreateDressmakerService } from '@dressmaker/services/create-dressmaker-service';
import { GetAllDressmakersInsideGeolocation } from '@dressmaker/services/get-all-dressmakers-inside-geolocation';
import { GetDistanceBetweenUserDressmakerService } from '@dressmaker/services/get-distance-between-user-dressmaker-service';
import { GetDressmakerService } from '@dressmaker/services/get-dressmaker-service';
import { SoftDeleteDressmakerService } from '@dressmaker/services/soft-delete-dressmaker-service';
import { UpdateDressmakerService } from '@dressmaker/services/update-dressmaker-service';

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
    GetDressmakerService,
    UpdateDressmakerService,
    SoftDeleteDressmakerService,
    GetAllDressmakersInsideGeolocation,
    GetDistanceBetweenUserDressmakerService,
    DressmakerRepository,
    UsersRepository,
  ],
  controllers: [DressmakerController],
})
export class DressmakerModule {}
