import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DressmakerRepository } from '../dressmaker/repositories/dressmakers.repository';
import { DressmakingsRepository } from '../dressmaking/repositories/dressmakings.repository';
import { DeliveryDateCalcService } from '../shipping/services/delivery-date-calc-service';
import { UsersRepository } from '../users/repositories/users.repository';
import { OrderController } from './controllers/order.controller';
import { OrderRepository } from './repositories/order.repository';
import { CreateOrderService } from './services/create-order-service';
import { GetOneOrderService } from './services/get-one-order-service';
import { GetOrderByUserService } from './services/get-order-by-user-service';

@Module({
  controllers: [OrderController],
  providers: [
    PrismaService,
    CreateOrderService,
    GetOneOrderService,
    GetOrderByUserService,
    DeliveryDateCalcService,
    OrderRepository,
    UsersRepository,
    DressmakerRepository,
    DressmakingsRepository,
  ],
})
export class OrderModule {}
