import { Address, Dressmaker } from '@prisma/client';
import { CrudInterface } from '../../../shared/implementations/crud.interface';
import { UpdateDressmakerDTO } from '../dtos/UpdateDressmakerDTO';

export interface CrudDressmakerInterface extends CrudInterface<Dressmaker> {
  create(data: Dressmaker & Address): Promise<Dressmaker>;
  findByEmail(email: string): Promise<Dressmaker | undefined>;
  softDelete(dressmaker: Dressmaker): Promise<Dressmaker>;
  update(
    dressmaker: Dressmaker,
    dressmakerDTO: UpdateDressmakerDTO,
  ): Promise<Dressmaker>;
  getAddressUser(dressmaker_id: string): Promise<Address[]>;
}
