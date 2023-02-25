import { Order, StatusOder } from '@prisma/client';
import { CrudInterface } from '../../../shared/implementations/crud.interface';

export interface CrudOrderInterface
  extends Omit<CrudInterface<Order>, 'update'> {
  update(id: string, status: StatusOder): Promise<Order>;
}
