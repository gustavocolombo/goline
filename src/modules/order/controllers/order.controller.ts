import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO';
import { CreateOrderService } from '../services/create-order-service';
import { GetOneOrderService } from '../services/get-one-order-service';
import { GetOrderByUserService } from '../services/get-order-by-user-service';
import { UpdateStatusOrderService } from '../services/update-status-order-service';

@Controller('order')
export class OrderController {
  constructor(
    private createOrderService: CreateOrderService,
    private getOneOrderService: GetOneOrderService,
    private getOrderByUserService: GetOrderByUserService,
  ) {}

  @Post()
  async createOrder(@Body() { user_id, dressmaking_id, tag }: CreateOrderDTO) {
    return await this.createOrderService.execute({
      user_id,
      dressmaking_id,
      tag,
    });
  }

  @Get('/:id')
  async getOneOrder(@Param('id') id: string) {
    return await this.getOneOrderService.execute(id);
  }

  @Get('/user/:user_id')
  async getOrderByUser(@Param('user_id') user_id: string) {
    return await this.getOrderByUserService.execute(user_id);
  }
}
