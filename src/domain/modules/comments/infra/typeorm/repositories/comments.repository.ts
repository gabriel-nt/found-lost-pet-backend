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
    const comments = await this.repository.find({
      order: {
        created_at: 'DESC',
      },
      relations: ['disappearance', 'user'],
    });

    return comments;
  }

  public async findById(id: string): Promise<Comment> {
    const comment = await this.repository.findOne({
      where: {
        id,
      },
      order: {
        created_at: 'DESC',
      },
      relations: ['disappearance', 'user'],
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
      relations: ['disappearance', 'user'],
    });

    return comment;
  }

  public async findByDescription(description: string): Promise<Comment> {
    const comment = await this.repository.findOne({
      where: {
        description,
      },
      relations: ['disappearance', 'user'],
    });

    return comment;
  }

  public async createComment({
    user_id,
    description,
    disappearance_id,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = this.repository.create({
      user_id,
      description,
      disappearance_id,
    });

    await this.repository.save(comment);

    return comment;
  }

  public async updateComment(
    id: string,
    { description, disappearance_id, user_id }: ICreateCommentDTO,
  ): Promise<Comment> {
    const comment = await this.repository.findOne({
      where: {
        id,
      },
    });

    Object.assign(comment, {
      user_id,
      description,
      disappearance_id,
    });

    await this.repository.save(comment);

    return comment;
  }

  public async deleteComment(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
