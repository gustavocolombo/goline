import { Injectable, NotFoundException } from '@nestjs/common';
import { DeliveryOption, Order, StatusOrder } from '@prisma/client';
import { DressmakingsRepository } from '@dressmaking/repositories/dressmakings.repository';
import { UsersRepository } from '@users/repositories/users.repository';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO';
import { OrderRepository } from '../repositories/order.repository';
import { uuid } from 'uuidv4';
import ErrorHandling from '@shared/errors/ErrorHandling';
import { DeliveryDateCalcService } from '@shipping/services/DeliveryDateCalc.service';
import { addDays } from 'date-fns';
import { GrabDressmakingService } from '@dressmaking/services/GrabDressmaking.service';

@Injectable()
export class CreateOrderService {
  constructor(
    private orderRepository: OrderRepository,
    private userRepository: UsersRepository,
    private dressmakingRepository: DressmakingsRepository,
    private deliveryDateCalcService: DeliveryDateCalcService,
    private grabDressmakingService: GrabDressmakingService,
  ) {}

  async execute({
    user_id,
    dressmaking_id,
    delivery_option,
    tag,
  }: CreateOrderDTO): Promise<Order> {
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

      if (dressmaking.status === 'rejected' || !dressmaking.value) {
        throw new NotFoundException(
          'Dressmaking not found, please provide a valid id',
        );
      }

      const shipping = await this.deliveryDateCalcService.execute({
        user_id: user.value.id,
        dressmaker_id: dressmaking.value.dressmaker_id,
      });

      const data: Order = {
        id: uuid(),
        user_id,
        dressmaking_id,
        tag,
        delivery_option,
        delivery_date:
          delivery_option === DeliveryOption.PAC
            ? addDays(new Date(), parseInt(shipping[0].PrazoEntrega))
            : addDays(new Date(), parseInt(shipping[1].PrazoEntrega)),
        created_at: new Date(),
        updated_at: undefined,
        final_price:
          delivery_option === DeliveryOption.PAC
            ? dressmaking.value.price + parseFloat(shipping[0].Valor)
            : dressmaking.value.price + parseFloat(shipping[1].Valor),
        status: StatusOrder.AWAITING_PAYMENT,
        tax_delivery:
          delivery_option === DeliveryOption.PAC
            ? parseFloat(shipping[0].Valor)
            : parseFloat(shipping[1].Valor),
      };

      await this.grabDressmakingService.execute({
        user_id,
        dressmaking_id,
      });

      const order = await this.orderRepository.create(data);

      return order;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
