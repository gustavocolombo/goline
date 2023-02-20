import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { DressmakingController } from '@dressmaking/controllers/dressmaking.controller';
import { DressmakingsRepository } from '@dressmaking/repositories/dressmakings.repository';
import { CreateDressmakingService } from '@dressmaking/services/create-dressmaking-service';
import { GetAllDressmakingService } from '@dressmaking/services/get-all-dressmaking';
import { GetDressmakingsByDressmakerService } from '@dressmaking/services/get-dressmakings-by-dresmaker-service';
import { GrabDressmakingService } from './services/grab-dressmaking-service';

import { UsersRepository } from '@users/repositories/users.repository';
import { GetFirstDressmakingsService } from '@dressmaking/services/adapters/get-first-dressmaking.service';
import { GetDressmakingAdapterService } from '@dressmaking/services/adapters/get-dressmaking.service';


@Module({
  providers: [
    DressmakingsRepository,
    PrismaService,
    UsersRepository,
    CreateDressmakingService,
    GetAllDressmakingService,
    GetDressmakingsByDressmakerService,
    GrabDressmakingService,
    GetFirstDressmakingsService,
    GetDressmakingAdapterService,
  ],
  controllers: [DressmakingController],
})
export class DressmakingModule {}
