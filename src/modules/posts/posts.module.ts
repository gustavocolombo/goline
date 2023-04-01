import { Module } from '@nestjs/common';
import { CreatePostService } from './services/CreatePost.service';
import { PostsRepository } from './repositories/posts.repository';
import { DressmakerRepository } from '../dressmaker/repositories/dressmakers.repository';
import { DressmakingsRepository } from '../dressmaking/repositories/dressmakings.repository';
import { PostsController } from './controllers/posts.controller';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';

@Module({
  controllers: [PostsController],
  providers: [
    CreatePostService,
    PostsRepository,
    DressmakerRepository,
    DressmakingsRepository,
    PrismaService,
  ],
})
export class PostsModule {}
