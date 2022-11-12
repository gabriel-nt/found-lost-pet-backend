import { CommentsRepository } from './../infra/typeorm/repositories/comments.repository';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCommentService {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(id: string): Promise<void> {
    const findComment = await this.commentsRepository.findById(id);

    if (!findComment) {
      throw new HttpException('Pet not found', 404);
    }

    await this.commentsRepository.deleteComment(id);
  }
}
