import { ICreateCommentDTO } from './../../../dtos/ICreateCommentDTO';
import { ICommentsRepository } from './../../../repositories/ICommentsRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsRepository implements ICommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private repository: Repository<Comment>,
  ) {}

  public async findAll(): Promise<Comment[]> {
    const comments = await this.repository.find();

    return comments;
  }

  public async findById(id: string): Promise<Comment> {
    const comment = await this.repository.findOne({
      where: {
        id,
      },
    });

    return comment;
  }

  public async findByDisappearance(
    disappearanceId: string,
  ): Promise<Comment[]> {
    const comment = await this.repository.find({
      where: {
        disappearance_id: disappearanceId,
      },
    });

    return comment;
  }

  public async findByTitle(title: string): Promise<Comment> {
    const comment = await this.repository.findOne({
      where: {
        title,
      },
    });

    return comment;
  }

  public async createComment({
    title,
    description,
    disappearanceId,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = this.repository.create({
      title,
      description,
      disappearance_id: disappearanceId,
    });

    await this.repository.save(comment);

    return comment;
  }

  public async updateComment(
    id: string,
    { title, description, disappearanceId }: ICreateCommentDTO,
  ): Promise<Comment> {
    const comment = await this.repository.findOne({
      where: {
        id,
      },
    });

    Object.assign(comment, {
      title,
      description,
      disappearanceId,
    });

    await this.repository.save(comment);

    return comment;
  }

  public async deleteComment(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
