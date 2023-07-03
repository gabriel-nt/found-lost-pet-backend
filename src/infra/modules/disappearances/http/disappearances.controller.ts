import { Request } from 'express';

import {
  Get,
  Put,
  Req,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Inject,
  HttpCode,
  Controller,
} from '@nestjs/common';

import {
  ApiBody,
  ApiTags,
  ApiQuery,
  getSchemaPath,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import {
  CreateDisappearanceDto,
  ListDisappearancesParamsDto,
} from './../../../../domain/modules/disappearances/dtos';

import {
  GetDisappearanceUseCase,
  DeleteDisappearanceUseCase,
  CreateDisappearanceUseCase,
  UpdateDisappearanceUseCase,
  ListDisappearancesUseCase,
} from './../../../../domain/modules/disappearances/use-cases';

import { Disappearance } from '../entities/disappearance.entity';

@Controller('disappearances')
export class DisappearancesController {
  constructor(
    @Inject('GetDisappearanceUseCase')
    private getDisappearanceService: GetDisappearanceUseCase,

    @Inject('GetDisappearanceUseCase')
    private listDisappearanceService: ListDisappearancesUseCase,

    @Inject('CreateDisappearanceUseCase')
    private createDisappearanceService: CreateDisappearanceUseCase,

    @Inject('UpdateDisappearanceUseCase')
    private updateDisappearanceService: UpdateDisappearanceUseCase,

    @Inject('DeleteDisappearanceUseCase')
    private deleteDisappearanceService: DeleteDisappearanceUseCase,
  ) {}

  @Get('/my-disappearances')
  @HttpCode(200)
  @ApiTags('disappearances')
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      items: { $ref: getSchemaPath(Disappearance) },
    },
  })
  @ApiQuery({
    name: 'situation',
    required: false,
    enum: ['MISSING', 'FOUND', 'SIGHTED'],
  })
  @ApiQuery({
    name: 'type',
    required: false,
    type: 'string',
  })
  @ApiQuery({
    name: 'initialDate',
    required: false,
    type: 'string',
  })
  @ApiQuery({
    name: 'finalDate',
    required: false,
    type: 'string',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
  })
  async listByUser(
    @Query() params: ListDisappearancesParamsDto,
    @Req() request: Request,
  ): Promise<Disappearance[]> {
    const { id: user_id } = request.user;

    const response = await this.listDisappearanceService.execute({
      user_id,
      ...params,
    });

    return response;
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiTags('disappearances')
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(Disappearance),
    },
  })
  async get(@Param('id') id: string): Promise<Disappearance> {
    const response = await this.getDisappearanceService.execute(id);

    return response;
  }

  @Get('/')
  @HttpCode(200)
  @ApiTags('disappearances')
  @ApiOkResponse({
    schema: {
      items: { $ref: getSchemaPath(Disappearance) },
    },
  })
  @ApiQuery({
    name: 'situation',
    required: false,
    enum: ['MISSING', 'FOUND', 'SIGHTED'],
  })
  @ApiQuery({
    name: 'type',
    required: false,
    type: 'string',
  })
  @ApiQuery({
    name: 'initialDate',
    required: false,
    type: 'string',
  })
  @ApiQuery({
    name: 'finalDate',
    required: false,
    type: 'string',
  })
  async list(
    @Query() params: ListDisappearancesParamsDto,
  ): Promise<Disappearance[]> {
    const response = await this.listDisappearanceService.execute(params);

    return response;
  }

  @Post('/')
  @HttpCode(201)
  @ApiTags('disappearances')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The disappearance has been successfully created.',
    type: Disappearance,
  })
  @ApiBody({
    // type: CreateDisappearanceDto,
  })
  async create(
    @Body() data: CreateDisappearanceDto,
    @Req() request: Request,
  ): Promise<Disappearance> {
    const { id: user_id } = request.user;

    const response = await this.createDisappearanceService.execute({
      ...data,
      user_id,
    });

    return response;
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiBody({
    // type: ICreateDisappearanceDTO,
  })
  @ApiBearerAuth()
  @ApiTags('disappearances')
  @ApiOkResponse({
    description: 'The disappearance has been successfully updated.',
    type: Disappearance,
  })
  async update(
    @Param('id') id: string,
    @Body() data: CreateDisappearanceDto,
    @Req() request: Request,
  ): Promise<Disappearance> {
    const { id: user_id } = request.user;

    const response = await this.updateDisappearanceService.execute(id, {
      ...data,
      user_id,
    });

    return response;
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiTags('disappearances')
  @ApiNoContentResponse({
    description: 'The disappearance has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteDisappearanceService.execute(id);
  }
}
