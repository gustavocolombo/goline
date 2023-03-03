import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class GetOrderByUserService {
  constructor(private orderRepository: OrderRepository) {}

  async execute(user_id: string): Promise<Order[]> {
    try {
      const order = await this.orderRepository.getByUser(user_id);

      return order;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
