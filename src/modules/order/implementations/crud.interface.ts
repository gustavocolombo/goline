import { CreateOrderDTO } from '../dtos/create-order.dto';

export interface CrudOrderInterface<Order> {
  create(data: CreateOrderDTO): Promise<Order>;
  findById(id: string): Promise<Order>;
  findByUser(user_id: string): Promise<Order[]>;
}
