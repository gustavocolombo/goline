import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Order, Users } from '@prisma/client';
import { UserDecorator } from '../../../shared/decorator/user.decorator';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO';
import { GetOrdersByUserSerializer } from '../serializers/GetOrdersByUser.serializer';
import { CreateOrderService } from '../services/CreateOrder.service';
import { GetOneOrderService } from '../services/GetOneOrder.service';
import { GetOrderByUserService } from '../services/GetOrderByUser.service';

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
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/user')
  async getOrderByUser(
    @UserDecorator() user: Users,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('qtd', new DefaultValuePipe(5), ParseIntPipe) qtd = 5,
    @Query('skippedItems', new DefaultValuePipe(0), ParseIntPipe)
    skippedItems = 0,
  ): Promise<GetOrdersByUserSerializer> {
    return await this.getOrderByUserService.execute(
      user.id,
      page,
      qtd,
      skippedItems,
    );
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
}
