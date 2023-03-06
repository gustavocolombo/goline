import { HttpStatus, Injectable } from '@nestjs/common';
import { Order, StatusOrder } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { CrudOrderInterface } from '../implementations/crud-order.interface';
import { GetOrdersByUserSerializer } from '../serializers/GetOrdersByUser.serializer';

@Injectable()
export class OrderRepository implements CrudOrderInterface {
  constructor(private prismaService: PrismaService) {}

  async create(data: Order): Promise<Order> {
    try {
      const order = await this.prismaService.order.create({
        data: {
          user_id: data.user_id,
          final_price: data.final_price,
          delivery_date: data.delivery_date,
          dressmaking_id: data.dressmaking_id,
          tag: data.tag,
          status: data.status,
          delivery_option: data.delivery_option,
          tax_delivery: data.tax_delivery,
        },
      });

      return order;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.prismaService.order.findUnique({
        where: { id },
      });

      return order;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async update(id: string, status: StatusOrder): Promise<Order> {
    try {
      const order = await this.prismaService.order.update({
        where: { id },
        data: {
          status,
        },
      });

      return order;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async delete(data: Order): Promise<Order> {
    try {
      const order = await this.prismaService.order.delete({
        where: { id: data.id },
      });

      return order;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async getByUser(
    user_id: string,
    page?: number,
    qtd?: number,
    skippedItems?: number,
  ): Promise<GetOrdersByUserSerializer> {
    try {
      const orderCount = await this.prismaService.order.count({
        where: { user_id },
      });

      const order = await this.prismaService.order.findMany({
        where: {
          user_id,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              status: true,
            },
          },
        },
        take: qtd ? qtd : undefined,
        skip: skippedItems ? skippedItems : undefined,
      });

      const totalCount = orderCount;
      const totalPages = Math.round(totalCount / qtd);

      return {
        data: order,
        totalCount,
        page: page ? page : 1,
        totalPages: totalPages > 0 ? totalPages : 1,
        status: HttpStatus.OK,
        message: 'Orders returned successfully',
      };
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
