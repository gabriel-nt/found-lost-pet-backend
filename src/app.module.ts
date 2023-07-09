import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';

import { UsersModule } from './infra/modules/users/users.module';
import { JwtProviderModule } from './infra/providers/jwt-provider';
import { AuthMiddleware } from './infra/middlewares/auth.middleware';
import { CommentsModule } from './infra/modules/comments/comments.module';
import { AuthConfigModule } from './infra/config/auth/auth-config.module';
import { JwtProvider } from './infra/providers/jwt-provider/jwt.provider';
import { TypeOrmConfigModule } from './infra/config/typeorm/typeorm.module';
import { AuthConfigService } from './infra/config/auth/auth-config.service';
import { DisappearancesModule } from './infra/modules/disappearances/disappearances.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    UsersModule,
    CommentsModule,
    AuthConfigModule,
    JwtProviderModule,
    DisappearancesModule,
  ],
  providers: [
    {
      provide: 'JwtProvider',
      useFactory: () => new JwtProvider(),
    },
    {
      provide: 'AuthConfig',
      useFactory: () => new AuthConfigService(),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: '/users/address',
        method: RequestMethod.POST,
      })
      .forRoutes(
        '/users/*',
        {
          path: '/comments',
          method: RequestMethod.POST,
        },
        {
          path: '/comments/*',
          method: RequestMethod.PUT,
        },
        {
          path: '/disappearances/my-disappearances',
          method: RequestMethod.GET,
        },
        {
          path: '/disappearances/*',
          method: RequestMethod.PUT,
        },
        {
          path: '/disappearances',
          method: RequestMethod.POST,
        },
      );
  }
}
