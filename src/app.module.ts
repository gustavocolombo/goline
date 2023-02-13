import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { DressmakerModule } from './modules/dressmaker/dressmaker.module';
import { UsersModule } from './modules/users/users.module';
import { OAuthService } from './modules/auth/services/oauth-service';
import { OAuthController } from './modules/auth/controllers/oauth.controller';
import { PrismaService } from './shared/infra/prisma/prisma.service';
import { ensureAuthenticatedMiddleware } from './shared/middlewares/ensureAuthenticatedMiddleware';
import { MailModule } from './modules/mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GatewayModule } from './modules/gateway/gateway.module';
import { GoogleStrategy } from './modules/auth/strategy/google.strategy';
import { DressmakingModule } from './modules/dressmaking/dressmaking.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    DressmakerModule,
    DressmakingModule,
    MailModule,
    GatewayModule,
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
        { path: '/api/authenticate/send-mail', method: RequestMethod.POST },
        {
          path: '/api/authenticate/redefine-password',
          method: RequestMethod.POST,
        },
        { path: '/api/dressmaker', method: RequestMethod.POST },
        {
          path: '/api/dressmaker/get-by-geolocation/:user_id',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('*');
  }
}
