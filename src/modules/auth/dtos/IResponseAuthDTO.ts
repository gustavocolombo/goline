export interface IResponseAuthDTO<T> {
  token: string;
  user: T;
}
