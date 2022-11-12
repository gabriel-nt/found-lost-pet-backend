import { HttpException, Injectable } from '@nestjs/common';
import { ICreateCommentDTO } from '../dtos/ICreateCommentDTO';
import { Comment } from '../infra/typeorm/entities/comment.entity';
import { CommentsRepository } from '../infra/typeorm/repositories/comments.repository';

@Injectable()
export class CreateCommentService {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(data: ICreateCommentDTO): Promise<Comment> {
    const findComment = await this.commentsRepository.findByTitle(data.title);

    if (findComment) {
      throw new HttpException('Comments already exists', 400);
    }

    const comment = await this.commentsRepository.createComment(data);

    return comment;
  }
}
