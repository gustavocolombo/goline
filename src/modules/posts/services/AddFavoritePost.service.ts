import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostsRepository } from '../repositories/posts.repository';
import { AddFavoritePostDTO } from '../dtos/AddFavoritePostDTO';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { UsersRepository } from '../../users/repositories/users.repository';
import { StatusUser } from '@prisma/client';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';

@Injectable()
export class AddFavoritPostService {
  constructor(
    private postRepository: PostsRepository,
    private usersRepository: UsersRepository,
    private prismaService: PrismaService,
  ) {}

  async execute({ user, post_id }: AddFavoritePostDTO) {
    try {
      const findUser = await this.usersRepository.findOne(user.id);

      if (
        !findUser ||
        findUser.status === (StatusUser.INACTIVE || StatusUser.DELETED)
      ) {
        throw new BadRequestException('User not found or invalid status');
      }

      const post = await this.postRepository.findOne(post_id);

      const postAlreadyFavorited =
        await this.postRepository.checkIfPostAlredyFavorited(post.id, user.id);

      if (postAlreadyFavorited) {
        throw new BadRequestException('Post already favorited by user');
      }

      if (!post) throw new NotFoundException('Post not found');

      const postUpdated = await this.postRepository.addFavorite({
        post_id,
        user,
      });

      return postUpdated;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
