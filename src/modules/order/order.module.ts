import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DressmakerRepository } from '../dressmaker/repositories/dressmakers.repository';
import { DressmakingsRepository } from '../dressmaking/repositories/dressmakings.repository';
import { GrabDressmakingService } from '../dressmaking/services/GrabDressmaking.service';
import { DeliveryDateCalcService } from '../shipping/services/DeliveryDateCalc.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { OrderController } from './controllers/order.controller';
import { OrderRepository } from './repositories/order.repository';
import { CreateOrderService } from './services/CreateOrder.service';
import { GetOneOrderService } from './services/GetOneOrder.service';
import { GetOrderByUserService } from './services/GetOrderByUser.service';

@Module({
  controllers: [OrderController],
  providers: [
    PrismaService,
    CreateOrderService,
    GetOneOrderService,
    GetOrderByUserService,
    DeliveryDateCalcService,
    GrabDressmakingService,
    OrderRepository,
    UsersRepository,
    DressmakerRepository,
    DressmakingsRepository,
  ],
})
export class OrderModule {}
