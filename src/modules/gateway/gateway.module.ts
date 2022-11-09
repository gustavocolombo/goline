import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { GetAllDressmakingsGateway } from './infra/services/get-all-dressmakings-gateway';

@Module({
  providers: [GetAllDressmakingsGateway, PrismaService],
})
export class GatewayModule {}
