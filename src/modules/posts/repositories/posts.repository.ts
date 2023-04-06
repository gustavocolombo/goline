import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { CreatePostDTO } from '../dtos/CreatePostDTO';
import { UpdatePostDTO } from '../dtos/UpdatePostDTO';
import { CrudPostsInterface } from '../implementations/crud-posts.interface';
import { AddFavoritePostDTO } from '../dtos/AddFavoritePostDTO';

@Injectable()
export class PostsRepository implements CrudPostsInterface {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreatePostDTO): Promise<Post> {
    try {
      const post = await this.prismaService.post.create({
        data: {
          title: data.title,
          image: data?.image,
          dressmaker: {
            connect: {
              id: data.dressmaker_id,
            },
          },
          dressmaking: {
            create: {
              name_service: data.dressmaking.name_service,
              price: data.dressmaking.price,
              start_date: data.dressmaking.start_date,
              end_date: data.dressmaking.end_date,
              dressmaker_id: data.dressmaker_id,
              grabbed: false,
              description: data.dressmaking.description,
              tag: data.dressmaking.tag,
            },
          },
        },
        include: {
          dressmaking: true,
          favorite_by: true,
        },
      });

      delete post.users_id;

      return post;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      const posts = await this.prismaService.post.findMany({
        orderBy: {
          created_at: 'desc',
        },
      });

      return posts;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: { id },
      });

      return post;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findAllFromDressmaker(dressmaker_id: string): Promise<Post[]> {
    try {
      const posts = await this.prismaService.post.findMany({
        where: { dressmaker_id },
      });

      return posts;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async update(data: UpdatePostDTO): Promise<Post> {
    try {
      const post = await this.prismaService.post.update({
        where: { id: data.post_id },
        data: {
          title: data.title,
          image: data.image,
          dressmaking: {
            update: {
              ...data.dressmaking,
            },
          },
        },
        include: {
          dressmaking: true,
        },
      });

      return post;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async addFavorite({ post_id, user }: AddFavoritePostDTO) {
    try {
      const post = await this.prismaService.post.update({
        where: { id: post_id },
        data: {
          stars: {
            increment: 1,
          },
          favorite_by: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      return post;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async checkIfPostAlredyFavorited(
    post_id: string,
    user_id: string,
  ): Promise<boolean> {
    try {
      const postIsFavorite = await this.prismaService.post.findFirst({
        where: {
          AND: [
            {
              favorite_by: {
                id: user_id,
              },
            },
            {
              id: post_id,
            },
          ],
        },
      });

      return postIsFavorite ? true : false;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async delete(id: string): Promise<Post> {
    try {
      const postDeleted = await this.prismaService.post.delete({
        where: { id },
      });

      return postDeleted;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
