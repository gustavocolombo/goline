import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, StatusOrder } from '@prisma/client';
import { DressmakingsRepository } from '../../dressmaking/repositories/dressmakings.repository';
import { UsersRepository } from '../../users/repositories/users.repository';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO';
import { OrderRepository } from '../repositories/order.repository';
import { uuid } from 'uuidv4';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class CreateOrderService {
  constructor(
    private orderRepository: OrderRepository,
    private userRepository: UsersRepository,
    private dressmakingRepository: DressmakingsRepository,
  ) {}

  async execute({
    user_id,
    dressmaking_id,
    tag,
  }: CreateOrderDTO): Promise<any> {
    try {
      const [user, dressmaking] = await Promise.allSettled([
        await this.userRepository.findOne(user_id),
        await this.dressmakingRepository.findById(dressmaking_id),
      ]);

      if (user.status === 'rejected' || !user.value) {
        throw new NotFoundException(
          'User not found, please provide a valid id',
        );
      }

      if (dressmaking.status === 'rejected') {
        throw new NotFoundException(
          'Dressmaking not found, please provide a valid id',
        );
      }

      const data: Order = {
        id: uuid(),
        user_id,
        dressmaking_id,
        tag,
        delivery_date: undefined,
        created_at: new Date(),
        updated_at: undefined,
        final_price: dressmaking.value.price,
        status: StatusOrder.AWAITING_PAYMENT,
      };

      const order = await this.orderRepository.create(data);

      return order;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
