import { HttpException } from '../../../../exceptions/http-exception';
import { CommentsRepository } from '../../../../../domain/modules/comments/repositories';
import { DeleteCommentUseCase } from '../../../../../domain/modules/comments/use-cases';

export class DeleteCommentService implements DeleteCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(id: string): Promise<void> {
    const findComment = await this.commentsRepository.findById(id);

    if (!findComment) {
      throw new HttpException('Comment not found', 404);
    }

    await this.commentsRepository.deleteComment(id);
  }
}
