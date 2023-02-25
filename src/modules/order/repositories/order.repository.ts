import { Injectable } from '@nestjs/common';
import { Order, StatusOrder } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { CrudOrderInterface } from '../implementations/crud-order.interface';

@Injectable()
export class OrderRepository implements CrudOrderInterface {
  constructor(private prismaService: PrismaService) {}

  async create(data: Order): Promise<Order> {
    try {
      const order = await this.prismaService.order.create({
        data: { ...data },
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

  async getByUser(user_id: string): Promise<Order[]> {
    try {
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
      });

      return order;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
