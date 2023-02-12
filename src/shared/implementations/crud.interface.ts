export interface CrudInterface<T> {
  create(data: T): Promise<T>;
  findOne(id: string): Promise<T>;
  update(data: T, user?: T): Promise<T>;
  delete(data: T): Promise<T>;
}
