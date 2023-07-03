import { CommentModel } from '../models';
import { CreateCommentDto } from '../dtos';

export interface CommentsRepository {
  findAll(): Promise<CommentModel[]>;
  findById(id: string): Promise<CommentModel>;
  deleteComment(id: string): Promise<void>;
  findByDescription(description: string): Promise<CommentModel>;
  findByDisappearance(disappearanceId: string): Promise<CommentModel[]>;
  createComment(data: CreateCommentDto): Promise<CommentModel>;
  updateComment(id: string, data: CreateCommentDto): Promise<CommentModel>;
}
