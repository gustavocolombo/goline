import { HttpStatus } from '@nestjs/common';
import { Order } from '@prisma/client';

export interface GetOrdersByUserSerializer {
  data: Order[];
  totalCount: number;
  page: number;
  totalPages: number;
  status: HttpStatus;
  message: string;
}
