import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostService } from '../services/CreatePost.service';
import { CreatePostDTO } from '../dtos/CreatePostDTO';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../../shared/roles/users-roles';
import { RolesUser } from '@prisma/client';

@ApiTags('posts')
@Controller('/posts')
export class PostsController {
  constructor(private createPostsService: CreatePostService) {}

  @ApiBearerAuth()
  @ApiOperation({ description: 'Route to create a new post with dressmaking' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Dressmaker is not available to create post',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Dressmaker not found',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Roles(RolesUser.DRESSMAKER)
  @Post()
  async createPost(
    @Body()
    { title, image, dressmaking, dressmaker_id }: CreatePostDTO,
  ) {
    return await this.createPostsService.execute({
      title,
      image,
      dressmaking,
      dressmaker_id,
    });
  }
}
