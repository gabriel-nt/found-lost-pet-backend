import { Request } from 'express';

import {
  Get,
  Put,
  Post,
  Body,
  Req,
  Param,
  Query,
  Inject,
  Delete,
  HttpCode,
  Controller,
} from '@nestjs/common';

import {
  ApiBody,
  ApiTags,
  ApiQuery,
  ApiOkResponse,
  getSchemaPath,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import {
  CreateCommentUseCase,
  UpdateCommentUseCase,
  ListCommentsUseCase,
  DeleteCommentUseCase,
} from '../../../../domain/modules/comments/use-cases';

import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './../../../../domain/modules/comments/dtos';

@Controller('comments')
export class CommentsController {
  constructor(
    @Inject('CreateCommentUseCase')
    private createCommentService: CreateCommentUseCase,

    @Inject('ListCommentsUseCase')
    private listCommentsService: ListCommentsUseCase,

    @Inject('UpdateCommentUseCase')
    private updateCommentService: UpdateCommentUseCase,

    @Inject('DeleteCommentUseCase')
    private deleteCommentService: DeleteCommentUseCase,
  ) {}

  @Get('/')
  @HttpCode(200)
  @ApiTags('comments')
  @ApiOkResponse({
    schema: {
      items: { $ref: getSchemaPath(Comment) },
    },
  })
  @ApiQuery({
    name: 'disappearanceId',
    type: 'uuid',
    required: false,
  })
  async list(
    @Query('disappearanceId') disappearanceId?: string,
  ): Promise<Comment[]> {
    const response = await this.listCommentsService.execute({
      disappearanceId,
    });

    return response;
  }

  @Post('/')
  @HttpCode(201)
  @ApiBearerAuth()
  @ApiTags('comments')
  @ApiCreatedResponse({
    description: 'The comment has been successfully created.',
    type: Comment,
  })
  @ApiBody({
    // type: CreateCommentDto,
  })
  async create(
    @Body() data: CreateCommentDto,
    @Req() request: Request,
  ): Promise<Comment> {
    const { id: user_id } = request.user;

    const response = await this.createCommentService.execute({
      ...data,
      user_id,
    });

    return response;
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiTags('comments')
  @ApiOkResponse({
    description: 'The comment has been successfully updated.',
    type: Comment,
  })
  @ApiBody({
    // type: ICreateCommentDTO,
  })
  async update(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() data: CreateCommentDto,
  ): Promise<Comment> {
    const { id: user_id } = request.user;

    const response = await this.updateCommentService.execute(id, {
      ...data,
      user_id,
    });

    return response;
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiTags('comments')
  @ApiNoContentResponse({
    description: 'The comment has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteCommentService.execute(id);
  }
}
