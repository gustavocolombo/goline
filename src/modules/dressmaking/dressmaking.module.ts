import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DressmakingController } from './controllers/dressmaking.controller';
import { DressmakingsRepository } from './repositories/dressmakings.repository';
import { CreateDressmakingService } from './services/create-dressmaking-service';
import { GetAllDressmakingService } from './services/get-all-dressmaking';
import { GetDressmakingsByDressmakerService } from './services/get-dressmakings-by-dresmaker-service';
import { GrabDressmakingService } from './services/grab-dressmaking-service';
import { UsersRepository } from '../users/repositories/users.repository';
import { GetFirstDressmakingsService } from './services/adapters/get-first-dressmaking.service';
import { GetDressmakingAdapterService } from './services/adapters/get-dressmaking.service';

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
