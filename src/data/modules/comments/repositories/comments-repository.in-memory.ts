import { CreateCommentDto } from '../../../../domain/modules/comments/dtos';
import { CommentModel } from '../../../../domain/modules/comments/models';
import { CommentsRepository } from '../../../../domain/modules/comments/repositories';

export class CommentsRepositoryInMemory implements CommentsRepository {
  comments: CommentModel[] = [];

  async findAll(): Promise<CommentModel[]> {
    return this.comments;
  }

  async findById(id: string): Promise<CommentModel> {
    const findComment = this.comments.find((comment) => comment.id === id);

    return findComment;
  }

  async deleteComment(id: string): Promise<void> {
    const commentsArray = new Set(this.comments);

    commentsArray.delete(this.comments.find((comment) => comment.id === id));

    this.comments = Array.from(commentsArray);
  }

  async findByDescription(description: string): Promise<CommentModel> {
    const findComment = this.comments.find(
      (comment) => comment.description === description,
    );

    return findComment;
  }

  async findByDisappearance(disappearanceId: string): Promise<CommentModel[]> {
    const findComment = this.comments.filter(
      (comment) => comment.disappearance_id === disappearanceId,
    );

    return findComment;
  }

  async createComment({
    description,
    disappearance_id,
    user_id,
  }: CreateCommentDto): Promise<CommentModel> {
    const comment: CommentModel = {
      user_id,
      description,
      disappearance_id,
      created_at: new Date(),
      updated_at: new Date(),
      id: Math.random().toString(),
    };

    this.comments.push(comment);

    return comment;
  }

  async updateComment(
    id: string,
    data: CreateCommentDto,
  ): Promise<CommentModel> {
    const comment = this.comments.find((comment) => comment.id === id);
    const findIndex = this.comments.findIndex((comment) => comment.id === id);

    Object.assign(comment, {
      ...data,
    });

    this.comments[findIndex] = comment;

    return comment;
  }
}
