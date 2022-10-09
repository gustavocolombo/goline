import { Logger, Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { AuthController } from './infra/http/express/controllers/auth.controller';
import { AuthenticateUsersService } from './infra/prisma/services/AuthenticateUserService';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [PrismaService, AuthenticateUsersService, Logger],
})
export class AuthModule {}
