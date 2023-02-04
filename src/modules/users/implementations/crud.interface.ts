import { Users } from '@prisma/client';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { SoftDeleteUserDTO } from '../dtos/SoftDeleteUserDTO';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';

export interface CrudInterface<T> {
  create(data: CreateUserDTO): Promise<Users>;
  findById(id: string): Promise<Users | undefined>;
  findByEmail(email: string): Promise<Users | undefined>;
  update(data: UpdateUserDTO): Promise<Users>;
  softDelete(data: SoftDeleteUserDTO): Promise<Users>;
}
