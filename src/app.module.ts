import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DressmakerModule } from './modules/dressmaker/dressmaker.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './shared/infra/prisma/prisma.service';

@Module({
  imports: [UsersModule, AuthModule, DressmakerModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
