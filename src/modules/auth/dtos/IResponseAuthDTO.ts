import { Dressmaker, Users } from '@prisma/client';

export interface IResponseAuthDTO<T> {
  token: string;
  user: T;
}

export type UsersResponse =
  | { token: string; user: PromiseSettledResult<Users> }
  | { token: string; user: PromiseSettledResult<Dressmaker> };
