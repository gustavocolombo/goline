import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostsRepository } from '../repositories/posts.repository';
import { CreatePostDTO } from '../dtos/CreatePostDTO';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { DressmakerRepository } from '../../dressmaker/repositories/dressmakers.repository';
import { StatusUser } from '@prisma/client';

@Injectable()
export class CreatePostService {
  constructor(
    private postsRepository: PostsRepository,
    private dressmakerRepository: DressmakerRepository,
  ) {}

  async execute({ title, image, dressmaker_id, dressmaking }: CreatePostDTO) {
    try {
      const dressmaker = await this.dressmakerRepository.findOne(dressmaker_id);

      if (!dressmaker) throw new NotFoundException('Dressmaker not found');

      if (dressmaker.status === (StatusUser.INACTIVE || StatusUser.DELETED))
        throw new BadRequestException(
          'Dressmaker is not available to create post',
        );

      const data = { title, image, dressmaker_id, dressmaking };

      const post = await this.postsRepository.create(data);

      return post;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
