import { DisappearancesRepository } from './../../disappearances/infra/http/typeorm/repositories/disappearances.repository';
import { HttpException, Injectable } from '@nestjs/common';
import { ICreateCommentDTO } from '../dtos/ICreateCommentDTO';
import { Comment } from '../infra/typeorm/entities/comment.entity';
import { CommentsRepository } from '../infra/typeorm/repositories/comments.repository';

@Injectable()
export class CreateCommentService {
  constructor(
    private commentsRepository: CommentsRepository,
    private disappearancesRepository: DisappearancesRepository,
  ) {}

  async execute(data: ICreateCommentDTO): Promise<Comment> {
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
