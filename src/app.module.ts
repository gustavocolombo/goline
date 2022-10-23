import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleStrategy } from './modules/auth/infra/strategy/google.strategy';
import { DressmakerModule } from './modules/dressmaker/dressmaker.module';
import { UsersModule } from './modules/users/users.module';
import { OAuthService } from './modules/auth/infra/services/express/oauth-service';
import { OAuthController } from './modules/auth/infra/http/express/controllers/oauth.controller';
import { PrismaService } from './shared/infra/prisma/prisma.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UsersModule,
    AuthModule,
    DressmakerModule,
  ],
  controllers: [OAuthController],
  providers: [
    PrismaService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    OAuthService,
    GoogleStrategy,
  ],
})
export class AppModule {}
