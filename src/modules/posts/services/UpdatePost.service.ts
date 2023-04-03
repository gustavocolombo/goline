import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from '../repositories/posts.repository';
import { Post } from '@prisma/client';
import { UpdatePostDTO } from '../dtos/UpdatePostDTO';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class UpdatePostService {
  constructor(private postRepository: PostsRepository) {}

  async execute({
    post_id,
    title,
    image,
    dressmaking,
  }: UpdatePostDTO): Promise<Post> {
    try {
      const post = await this.postRepository.findOne(post_id);

      if (!post) throw new NotFoundException('Post not found');

      const data = { post_id, title, image, dressmaking };

      const updatedPost = await this.postRepository.update(data);

      return updatedPost;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
