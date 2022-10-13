import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DressmakerController } from './infra/http/express/controller/dressmaker.controller';
import { CreateDressmakerService } from './infra/prisma/services/create-dressmaker-service';

@Module({
  providers: [PrismaService, CreateDressmakerService],
  controllers: [DressmakerController],
})
export class DressmakerModule {}
