import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DressmakingController } from './controllers/dressmaking.controller';
import { DressmakingsRepository } from './repositories/dressmakings.repository';
import { CreateDressmakingService } from './services/create-dressmaking-service';
import { GetAllDressmakingService } from './services/get-all-dressmaking';
import { GetDressmakingsService } from './services/get-dressmakings-service';
import { GrabDressmakingService } from './services/grab-dressmaking-service';
import { UsersRepository } from '../users/repositories/users.repository';

@Module({
  providers: [
    DressmakingsRepository,
    PrismaService,
    UsersRepository,
    CreateDressmakingService,
    GetAllDressmakingService,
    GetDressmakingsService,
    GrabDressmakingService,
  ],
  controllers: [DressmakingController],
})
export class DressmakingModule {}
