import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { AuthController } from './infra/http/express/controllers/auth.controller';
import { AuthenticateUsersService } from './infra/services/prisma/AuthenticateUserService';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [PrismaService, AuthenticateUsersService, Logger],
})
export class AuthModule {}
