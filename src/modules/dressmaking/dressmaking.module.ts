import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { DressmakingController } from '@dressmaking/controllers/dressmaking.controller';
import { DressmakingsRepository } from '@dressmaking/repositories/dressmakings.repository';
import { CreateDressmakingService } from '@dressmaking/services/CreateDressmaking.service';
import { GetAllDressmakingService } from '@dressmaking/services/GetAllDressmaking.service';
import { GetDressmakingsByDressmakerService } from '@dressmaking/services/GetDressmakingByDressmaker.service';
import { GrabDressmakingService } from './services/GrabDressmaking.service';

import { UsersRepository } from '@users/repositories/users.repository';
import { GetFirstDressmakingsService } from '@dressmaking/services/adapters/GetFirstDressmaking.service';
import { GetDressmakingAdapterService } from '@dressmaking/services/adapters/GetDressmaking.service';

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
