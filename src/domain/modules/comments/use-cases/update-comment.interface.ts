import { CommentModel } from '../models';
import { CreateCommentDto } from '../dtos';

export interface UpdateCommentUseCase {
  execute: (id: string, data: CreateCommentDto) => Promise<CommentModel>;
}
