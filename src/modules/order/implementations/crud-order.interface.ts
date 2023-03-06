import { Order, StatusOrder } from '@prisma/client';
import { CrudInterface } from '../../../shared/implementations/crud.interface';
import { GetOrdersByUserSerializer } from '../serializers/GetOrdersByUser.serializer';

export interface CrudOrderInterface
  extends Omit<CrudInterface<Order>, 'update'> {
  update(id: string, status: StatusOrder): Promise<Order>;
  getByUser(user_id: string): Promise<GetOrdersByUserSerializer>;
}
