import { IListCommentsParams } from './../dtos/IListCommentsParams';
import { CommentsRepository } from './../infra/typeorm/repositories/comments.repository';
import { Injectable } from '@nestjs/common';
import { Comment } from '../infra/typeorm/entities/comment.entity';

@Injectable()
export class ListCommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({ disappearanceId }: IListCommentsParams): Promise<Comment[]> {
    let disappearances = [];

    if (!disappearanceId) {
      disappearances = await this.commentsRepository.findAll();
    } else {
      disappearances = await this.commentsRepository.findByDisappearance(
        disappearanceId,
      );
    }

    return disappearances;
  }
}
