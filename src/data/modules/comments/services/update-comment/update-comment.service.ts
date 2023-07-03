import { HttpException } from '../../../../exceptions/http-exception';
import { CommentModel } from '../../../../../domain/modules/comments/models';
import { CreateCommentDto } from '../../../../../domain/modules/comments/dtos';
import { CommentsRepository } from '../../../../../domain/modules/comments/repositories';
import { UpdateCommentUseCase } from '../../../../../domain/modules/comments/use-cases';

export class UpdateCommentService implements UpdateCommentUseCase {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async execute(id: string, data: CreateCommentDto): Promise<CommentModel> {
    const findComment = await this.commentsRepository.findById(id);

    if (!findComment) {
      throw new HttpException('Comment not found', 404);
    }

    const comment = await this.commentsRepository.updateComment(id, data);

    return comment;
  }
}
