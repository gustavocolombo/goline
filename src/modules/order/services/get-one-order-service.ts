import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class GetOneOrderService {
  constructor(private orderRepository: OrderRepository) {}

  async execute(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne(id);

      if (!order) throw new NotFoundException('Order not found');

      return order;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
