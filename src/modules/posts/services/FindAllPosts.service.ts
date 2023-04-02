import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../repositories/posts.repository';
import { Post } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class FindAllPostsService {
  constructor(private postsRepository: PostsRepository) {}

  async execute(): Promise<Post[]> {
    try {
      const dressmakings = await this.postsRepository.findAll();

      return dressmakings;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
