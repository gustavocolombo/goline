import { Dressmaking } from '@prisma/client';

export interface GetAllDressmakings {
  getAll(): Promise<Dressmaking[]>;
}
