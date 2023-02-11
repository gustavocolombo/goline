export interface CrudInterface<T> {
  create(data: T): Promise<T>;
  findOne(id: string): Promise<T>;
  update(data: T): Promise<T>;
  delete(data: T): Promise<T>;
}
