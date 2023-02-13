import { Dressmaking } from '@prisma/client';

export interface SearchDressmakings {
  search(id?: string): Promise<Dressmaking | Dressmaking[]>;
}
