import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DressmakingsRepository } from '../dressmaking/repositories/dressmakings.repository';
import { UsersRepository } from '../users/repositories/users.repository';
import { OrderController } from './controllers/order.controller';
import { OrderRepository } from './repositories/order.repository';
import { CreateOrderService } from './services/create-order-service';

@Module({
  controllers: [OrderController],
  providers: [
    PrismaService,
    CreateOrderService,
    OrderRepository,
    UsersRepository,
    DressmakingsRepository,
  ],
})
export class OrderModule {}
