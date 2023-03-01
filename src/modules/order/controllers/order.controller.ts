import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO';
import { CreateOrderService } from '../services/create-order-service';
import { GetOneOrderService } from '../services/get-one-order-service';
import { GetOrderByUserService } from '../services/get-order-by-user-service';

@Controller('order')
export class OrderController {
  constructor(
    private createOrderService: CreateOrderService,
    private getOneOrderService: GetOneOrderService,
    private getOrderByUserService: GetOrderByUserService,
  ) {}

  @ApiResponse({ description: 'Request to create an order of service' })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    status: 201,
    description: 'The order has been create successfully',
  })
  @ApiUnauthorizedResponse({
    status: 404,
    description: 'User not authorized, JWT token is missing',
  })
  @ApiNotFoundResponse({
    status: 401,
    description:
      'Fail at create order service, user or dressmaking id is not valid',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error, contact development team',
  })
  @Post()
  async createOrder(
    @Body() { user_id, dressmaking_id, tag, delivery_option }: CreateOrderDTO,
  ): Promise<Order> {
    return await this.createOrderService.execute({
      user_id,
      dressmaking_id,
      tag,
      delivery_option,
    });
  }

  @ApiResponse({ description: 'Request to get specific order of service' })
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'The order has been recovered successfully',
  })
  @ApiUnauthorizedResponse({
    status: 404,
    description: 'User not authorized, JWT token is missing',
  })
  @ApiNotFoundResponse({
    status: 401,
    description: 'Fail at get order service, order id is not valid',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error, contact development team',
  })
  @Get('/:id')
  async getOneOrder(@Param('id') id: string): Promise<Order> {
    return await this.getOneOrderService.execute(id);
  }

  @ApiResponse({
    description: 'Request to get order of service from specific user',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'The orders has been recovered successfully',
  })
  @ApiUnauthorizedResponse({
    status: 404,
    description: 'User not authorized, JWT token is missing',
  })
  @ApiNotFoundResponse({
    status: 401,
    description: 'Fail at get order service, user id is not valid',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error, contact development team',
  })
  @Get('/user/:user_id')
  async getOrderByUser(@Param('user_id') user_id: string): Promise<Order[]> {
    return await this.getOrderByUserService.execute(user_id);
  }
}
