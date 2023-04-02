import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from '../repositories/posts.repository';
import { Post } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class DeletePostService {
  constructor(private postsRepository: PostsRepository) {}

  async execute(id: string): Promise<Post> {
    try {
      let dressmaking = await this.postsRepository.findOne(id);

      if (!dressmaking) throw new NotFoundException('Post not found');

      dressmaking = await this.postsRepository.delete(id);

      return dressmaking;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
