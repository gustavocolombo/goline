import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostService } from '../services/CreatePost.service';
import { CreatePostDTO } from '../dtos/CreatePostDTO';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../../../shared/roles/users-roles';
import { RolesUser } from '@prisma/client';
import { DeletePostService } from '../services/DeletePost.service';
import { FindAllPostsService } from '../services/FindAllPosts.service';
import { FindAllPostsByDressmaker } from '../services/FindAllPostsByDressmaker.service';
import { UpdatePostService } from '../services/UpdatePost.service';
import { UpdatePostDTO } from '../dtos/UpdatePostDTO';

@ApiTags('posts')
@Controller('/posts')
export class PostsController {
  constructor(
    private createPostsService: CreatePostService,
    private deletePostService: DeletePostService,
    private findAllPostsService: FindAllPostsService,
    private findAllPostsByDressmaker: FindAllPostsByDressmaker,
    private updatePostService: UpdatePostService,
  ) {}

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
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'User not allowed to perform this operations',
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

  @ApiOperation({ description: 'Route to get all posts' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'User not allowed to perform this operation',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Roles(RolesUser.DRESSMAKER, RolesUser.USER)
  @Get()
  async findAllPosts() {
    return this.findAllPostsService.execute();
  }

  @ApiOperation({ description: 'Route to get all posts' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'User not allowed to perform this operation',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Roles(RolesUser.DRESSMAKER, RolesUser.USER)
  @Get('/:dressmaker_id')
  async findPostsByDressmaker(@Param('dressmaker_id') dressmaker_id: string) {
    return this.findAllPostsByDressmaker.execute(dressmaker_id);
  }

  @ApiOperation({ description: 'Route to update specific post' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'User not allowed to perform this operation',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Post not found',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Roles(RolesUser.DRESSMAKER, RolesUser.USER)
  @Put()
  async updatePost(@Body() dataUpdatePost: UpdatePostDTO) {
    return this.updatePostService.execute(dataUpdatePost);
  }

  @ApiOperation({ description: 'Route to delete a post' })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ status: 404, description: 'Post not found' })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'User not allowed to perform this operation',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Roles(RolesUser.DRESSMAKER)
  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    return this.deletePostService.execute(id);
  }
}
