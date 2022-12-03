import { DisappearancesModule } from './domain/modules/disappearances/disappearances.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AuthMiddleware } from './infra/middleware/auth.middleware';
import { TypeOrmConfigModule } from './infra/config/typeorm/typeorm.module';
import { CommentsModule } from './domain/modules/comments/comments.module';
import { UsersModule } from './domain/modules/users/users.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    UsersModule,
    DisappearancesModule,
    CommentsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
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
        path: '/disappearances/*',
        method: RequestMethod.PUT,
      },
      {
        path: '/disappearances',
        method: RequestMethod.POST,
      },
      {
        path: '/disappearances/my-disappearances',
        method: RequestMethod.GET,
      },
    );
  }
}
