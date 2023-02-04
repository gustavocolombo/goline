import { Dressmaker } from '@prisma/client';
import { CreateDressmakerDTO } from '../../dtos/CreateDressmakerDTO';
import { UpdateDressmakerDTO } from '../../dtos/UpdateDressmakerDTO';

export interface CrudInterface<T> {
  create(data: CreateDressmakerDTO): Promise<Dressmaker>;
  findById(id: string): Promise<Dressmaker | undefined>;
  findByEmail(email: string): Promise<Dressmaker | undefined>;
  softDelete(dressmaker: Dressmaker): Promise<Dressmaker>;
  update(
    dressmaker: Dressmaker,
    dressmakerDTO: UpdateDressmakerDTO,
  ): Promise<Dressmaker>;
}
