import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO';
import { CreateOrderService } from '../services/create-order-service';

@Controller('order')
export class OrderController {
  constructor(private createOrderService: CreateOrderService) {}

  @Post()
  async createOrder(@Body() { user_id, dressmaking_id, tag }: CreateOrderDTO) {
    return await this.createOrderService.execute({
      user_id,
      dressmaking_id,
      tag,
    });
  }
}
