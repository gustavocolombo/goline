import { Injectable } from '@nestjs/common';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { OrderRepository } from '../repositories/order.repository';
import { GetOrdersByUserSerializer } from '../serializers/GetOrdersByUser.serializer';

@Injectable()
export class GetOrderByUserService {
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    user_id: string,
    page?: number,
    qtd?: number,
    skippedItems?: number,
  ): Promise<GetOrdersByUserSerializer> {
    try {
      const order = await this.orderRepository.getByUser(
        user_id,
        page,
        qtd,
        skippedItems,
      );

      return order;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
