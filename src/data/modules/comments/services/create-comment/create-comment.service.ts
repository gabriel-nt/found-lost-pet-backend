import { HttpException } from '../../../../exceptions/http-exception';
import { CommentModel } from '../../../../../domain/modules/comments/models';
import { CreateCommentDto } from '../../../../../domain/modules/comments/dtos';
import { CommentsRepository } from '../../../../../domain/modules/comments/repositories';
import { CreateCommentUseCase } from '../../../../../domain/modules/comments/use-cases';
import { DisappearancesRepository } from '../../../../../domain/modules/disappearances/repositories';

export class CreateCommentService implements CreateCommentUseCase {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly disappearancesRepository: DisappearancesRepository,
  ) {}

  async execute(data: CreateCommentDto): Promise<CommentModel> {
    const findComment = await this.commentsRepository.findByDescription(
      data.description,
    );

    if (findComment) {
      throw new HttpException('Comments already exists', 400);
    }

    const findDisappearance = await this.disappearancesRepository.findById(
      data.disappearance_id,
    );

    await this.disappearancesRepository.updateDisappearance(
      findDisappearance.id,
      {
        ...findDisappearance,
        situation: 'SIGHTED',
      },
    );

    const comment = await this.commentsRepository.createComment(data);

    return comment;
  }
}
