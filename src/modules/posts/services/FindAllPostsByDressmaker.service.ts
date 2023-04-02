import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../repositories/posts.repository';
import { Post } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class FindAllPostsByDressmaker {
  constructor(private postsRepository: PostsRepository) {}

  async execute(dressmaker_id: string): Promise<Post[]> {
    try {
      const dressmakings = await this.postsRepository.findAllFromDressmaker(
        dressmaker_id,
      );

      return dressmakings;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
