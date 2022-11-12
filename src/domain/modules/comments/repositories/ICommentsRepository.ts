import { ICreateCommentDTO } from '../dtos/ICreateCommentDTO';
import { Comment } from '../infra/typeorm/entities/comment.entity';

export interface ICommentsRepository {
  findAll(): Promise<Comment[]>;
  findById(id: string): Promise<Comment>;
  deleteComment(id: string): Promise<void>;
  findByTitle(title: string): Promise<Comment>;
  findByDisappearance(disappearanceId: string): Promise<Comment[]>;
  createComment(data: ICreateCommentDTO): Promise<Comment>;
  updateComment(id: string, data: ICreateCommentDTO): Promise<Comment>;
}
