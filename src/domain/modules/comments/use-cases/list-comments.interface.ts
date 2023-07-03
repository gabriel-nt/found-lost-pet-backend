import { ListCommentsParamsDto } from '../dtos';
import { CommentModel } from '../models';

export interface ListCommentsUseCase {
  execute: (data: ListCommentsParamsDto) => Promise<CommentModel[]>;
}
