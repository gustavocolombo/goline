import { Dressmaking } from '@prisma/client';

export interface GetOneDressmaking {
  getOne(): Promise<Dressmaking>;
}
