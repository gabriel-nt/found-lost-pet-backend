import { CommentModel } from '../../../../../domain/modules/comments/models';
import { ListCommentsParamsDto } from '../../../../../domain/modules/comments/dtos';
import { ListCommentsUseCase } from '../../../../../domain/modules/comments/use-cases';
import { CommentsRepository } from '../../../../../domain/modules/comments/repositories';

export class ListCommentsService implements ListCommentsUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    disappearanceId,
  }: ListCommentsParamsDto): Promise<CommentModel[]> {
    let comments = [];

    if (!disappearanceId) {
      comments = await this.commentsRepository.findAll();
    } else {
      comments = await this.commentsRepository.findByDisappearance(
        disappearanceId,
      );
    }

    return comments;
  }
}
