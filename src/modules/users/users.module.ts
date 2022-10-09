import { Logger, Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { AuthenticateUsersService } from '../auth/infra/prisma/services/AuthenticateUserService';
import { UsersController } from './infra/http/express/controllers/users.controller';
import { CreateUserService } from './infra/prisma/services/CreateUserService';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    PrismaService,
    CreateUserService,
    AuthenticateUsersService,
    Logger,
  ],
})
export class UsersModule {}
