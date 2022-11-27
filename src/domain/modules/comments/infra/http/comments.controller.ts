import { ICreateCommentDTO } from './../../dtos/ICreateCommentDTO';
import {
  Controller,
  HttpCode,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Comment } from '../typeorm/entities/comment.entity';
import { CreateCommentService } from '../../services/createCommentService.service';
import { ListCommentsService } from '../../services/listComments.service';
import { UpdateCommentService } from '../../services/updateComment.service';
import { DeleteCommentService } from '../../services/deleteComment.service';
import { Request } from 'express';

@Controller('comments')
export class CommentsController {
  constructor(
    private createCommentService: CreateCommentService,
    private listCommentsService: ListCommentsService,
    private updateCommentService: UpdateCommentService,
    private deleteCommentService: DeleteCommentService,
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
    type: ICreateCommentDTO,
  })
  async create(
    @Body() data: ICreateCommentDTO,
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
    type: ICreateCommentDTO,
  })
  async update(
    @Param('id') id: string,
    @Req() request: Request,
    @Body() data: ICreateCommentDTO,
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
