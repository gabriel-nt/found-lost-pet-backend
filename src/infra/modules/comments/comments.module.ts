import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  DeleteCommentService,
  UpdateCommentService,
  CreateCommentService,
  ListCommentsService,
} from '../../../data/modules/comments/services';

import { Comment } from './entities';
import { CommentsController } from './http';
import { CommentsRepository } from './repositories';
import { DisappearancesRepository } from '../disappearances/repositories';
import { DisappearancesModule } from '../disappearances/disappearances.module';

@Module({
  controllers: [CommentsController],
  imports: [DisappearancesModule, TypeOrmModule.forFeature([Comment])],
  providers: [
    CommentsRepository,
    {
      provide: 'ListCommentsUseCase',
      inject: [CommentsRepository],
      useFactory: (repository: CommentsRepository) =>
        new ListCommentsService(repository),
    },
    {
      provide: 'CreateCommentUseCase',
      inject: [CommentsRepository, DisappearancesRepository],
      useFactory: (
        commentsRepository: CommentsRepository,
        disappearancesRepository: DisappearancesRepository,
      ) =>
        new CreateCommentService(commentsRepository, disappearancesRepository),
    },
    {
      provide: 'UpdateCommentUseCase',
      inject: [CommentsRepository],
      useFactory: (repository: CommentsRepository) =>
        new UpdateCommentService(repository),
    },
    {
      provide: 'DeleteCommentUseCase',
      inject: [CommentsRepository],
      useFactory: (repository: CommentsRepository) =>
        new DeleteCommentService(repository),
    },
  ],
})
export class CommentsModule {}
