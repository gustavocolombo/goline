import { Module } from '@nestjs/common';
import { CreatePostService } from './services/CreatePost.service';
import { PostsRepository } from './repositories/posts.repository';
import { DressmakerRepository } from '../dressmaker/repositories/dressmakers.repository';
import { DressmakingsRepository } from '../dressmaking/repositories/dressmakings.repository';
import { PostsController } from './controllers/posts.controller';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { DeletePostService } from './services/DeletePost.service';
import { FindAllPostsService } from './services/FindAllPosts.service';
import { FindAllPostsByDressmaker } from './services/FindAllPostsByDressmaker.service';
import { UpdatePostService } from './services/UpdatePost.service';

@Module({
  controllers: [PostsController],
  providers: [
    CreatePostService,
    DeletePostService,
    FindAllPostsService,
    FindAllPostsByDressmaker,
    UpdatePostService,
    PostsRepository,
    DressmakerRepository,
    DressmakingsRepository,
    PrismaService,
  ],
})
export class PostsModule {}
