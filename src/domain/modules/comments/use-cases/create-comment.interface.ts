import { CommentModel } from '../models';
import { CreateCommentDto } from './../dtos';

export interface CreateCommentUseCase {
  execute: (data: CreateCommentDto) => Promise<CommentModel>;
}
