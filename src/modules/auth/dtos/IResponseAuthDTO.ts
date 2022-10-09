import { Users } from '@prisma/client';

export interface IResponseAuthDTO {
  token: string;
  user: Users;
}
