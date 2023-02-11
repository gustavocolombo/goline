import { Address, Users } from '@prisma/client';
import { CrudInterface } from '../../../shared/implementations/crud.interface';
import { SoftDeleteUserDTO } from '../dtos/SoftDeleteUserDTO';

export interface CrudUserInterface extends CrudInterface<Users> {
  create(data: Users & Address): Promise<Users>;
  findByEmail(email: string): Promise<Users | undefined>;
  softDelete(data: SoftDeleteUserDTO): Promise<Users>;
  findAllUsers(): Promise<Users[]>;
}
