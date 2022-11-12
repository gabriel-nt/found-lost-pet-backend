import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeleteCommentService } from './services/deleteComment.service';
import { UpdateCommentService } from './services/updateComment.service';
import { CreateCommentService } from './services/createCommentService.service';
import { ListCommentsService } from './services/listComments.service';
import { CommentsController } from './infra/http/comments.controller';

import { Comment } from './infra/typeorm/entities/comment.entity';
import { CommentsRepository } from './infra/typeorm/repositories/comments.repository';

@Module({
  controllers: [CommentsController],
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [
    CommentsRepository,
    ListCommentsService,
    CreateCommentService,
    UpdateCommentService,
    DeleteCommentService,
  ],
})
export class CommentsModule {}
