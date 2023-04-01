import { Post } from '@prisma/client';
import { CreatePostDTO } from '../dtos/CreatePostDTO';
import { UpdatePostDTO } from '../dtos/UpdatePostDTO';

export interface CrudPostsInterface {
  create(data: CreatePostDTO): Promise<Post>;
  findAll(): Promise<Post[]>;
  findOne(id: string): Promise<Post>;
  findAllFromDressmaker(dressmaker_id: string): Promise<Post[]>;
  delete(id: string): Promise<Post>;
  update(data: UpdatePostDTO): Promise<Post>;
}
