import { Post } from '@prisma/client';
import { CreatePostDTO } from '../dtos/CreatePostDTO';
import { UpdatePostDTO } from '../dtos/UpdatePostDTO';
import { AddFavoritePostDTO } from '../dtos/AddFavoritePostDTO';

export interface CrudPostsInterface {
  create(data: CreatePostDTO): Promise<Post>;
  findAll(): Promise<Post[]>;
  findOne(id: string): Promise<Post>;
  findAllFromDressmaker(dressmaker_id: string): Promise<Post[]>;
  delete(id: string): Promise<Post>;
  update(data: UpdatePostDTO): Promise<Post>;
  addFavorite(data: AddFavoritePostDTO): Promise<Post>;
  checkIfPostAlredyFavorited(
    post_id: string,
    user_id: string,
  ): Promise<boolean>;
}
