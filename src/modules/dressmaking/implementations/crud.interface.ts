import { Dressmaker } from '@prisma/client';
import { CreateDressmakingDTO } from '../dtos/CreateDressmakingDTO';
import {
  GetAllDressmakingDTO,
  GetDressmakingDTO,
  ReturnDressmakingDTO,
} from '../dtos/GetDressmakingsDTO';
import { GrabDressmakingDTO } from '../dtos/GrabDressmakingDTO';

export interface CrudDressmakingInterface<Dressmaking> {
  create(data: CreateDressmakingDTO): Promise<Dressmaking>;
  findFirstToCreate(dressmaker_id: string): Promise<Dressmaker | null>;
  getDressmakingsByDressmaker(
    id: GetDressmakingDTO,
  ): Promise<ReturnDressmakingDTO[]>;
  grabDressmaking(data: GrabDressmakingDTO): Promise<Dressmaking | null>;
  findFirst(dressmaking_id: string): Promise<Dressmaking | null>;
  getAllDressmakings(
    skip?: number,
    take?: number,
  ): Promise<GetAllDressmakingDTO[]>;
  findById(id: string): Promise<Dressmaking>;
}
