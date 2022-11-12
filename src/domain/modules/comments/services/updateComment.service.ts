import { ICreateCommentDTO } from './../dtos/ICreateCommentDTO';
import { CommentsRepository } from './../infra/typeorm/repositories/comments.repository';

import { HttpException, Injectable } from '@nestjs/common';
import { Comment } from '../infra/typeorm/entities/comment.entity';

@Injectable()
export class UpdateCommentService {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(id: string, data: ICreateCommentDTO): Promise<Comment> {
    const findComment = await this.commentsRepository.findById(id);

    if (!findComment) {
      throw new HttpException('Pet not found', 404);
    }

    const comment = await this.commentsRepository.updateComment(id, data);

    return comment;
  }
}
