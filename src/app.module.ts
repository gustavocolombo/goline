import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleStrategy } from './modules/auth/infra/strategy/google.strategy';
import { DressmakerModule } from './modules/dressmaker/dressmaker.module';
import { UsersModule } from './modules/users/users.module';
import { OAuthService } from './modules/auth/infra/services/express/oauth-service';
import { OAuthController } from './modules/auth/infra/http/express/controllers/oauth.controller';
import { PrismaService } from './shared/infra/prisma/prisma.service';
import { ensureAuthenticatedMiddleware } from './shared/middlewares/ensureAuthenticatedMiddleware';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UsersModule,
    AuthModule,
    DressmakerModule,
    MailModule,
  ],
  controllers: [OAuthController],
  providers: [
    PrismaService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    OAuthService,
    GoogleStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthenticatedMiddleware)
      .exclude(
        { path: '/api/users', method: RequestMethod.POST },
        { path: '/api/authenticate', method: RequestMethod.POST },
        { path: '/api/dressmaker', method: RequestMethod.POST },
        { path: '/api/mail', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
