import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DressmakingController } from './controllers/dressmaking.controller';
import { DressmakingsRepository } from './repositories/dressmakings.repository';
import { CreateDressmakingService } from './services/create-dressmaking-service';
import { GetAllDressmakingService } from './services/get-all-dressmaking';
import { GetDressmakingsService } from './services/get-dressmakings-service';
import { GrabDressmakingService } from './services/grab-dressmaking-service';
import { UsersRepository } from '../users/repositories/users.repository';
import { GetOneDressmakingAdapter } from './adapters/get-one-dressmaking.adapter';
import { GetOneDressmakingsService } from './services/adapters/get-one-dressmaking.service';
import { GetAllDressmakingAdapter } from './adapters/get-all-dressmaking.adapter';
import { GetAllDressmakingsService } from './services/adapters/get-all-dressmaking.service';
import { GetDressmakingService } from './services/adapters/get-dressmaking.service';

@Module({
  providers: [
    DressmakingsRepository,
    PrismaService,
    UsersRepository,
    CreateDressmakingService,
    GetAllDressmakingService,
    GetDressmakingsService,
    GrabDressmakingService,
    GetOneDressmakingAdapter,
    GetOneDressmakingsService,
    GetAllDressmakingAdapter,
    GetAllDressmakingsService,
    GetDressmakingService,
  ],
  controllers: [DressmakingController],
})
export class DressmakingModule {}
