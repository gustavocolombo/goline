import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DressmakerRepository } from '../dressmaker/repositories/dressmakers.repository';
import { UsersRepository } from '../users/repositories/users.repository';
import { ShippingController } from './controllers/shipping.controller';
import { DeliveryDateCalcService } from './services/delivery-date-calc-service';
import { GetZipCodeByUserService } from './services/get-zip-code-by-user-service';

@Module({
  controllers: [ShippingController],
  providers: [
    UsersRepository,
    DressmakerRepository,
    PrismaService,
    DeliveryDateCalcService,
    GetZipCodeByUserService,
  ],
})
export class ShippingModule {}
