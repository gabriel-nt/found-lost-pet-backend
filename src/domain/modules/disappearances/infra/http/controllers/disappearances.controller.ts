import { GetDisappearanceService } from './../../../services/getDisappearance.service';
import { DeleteDisappearanceService } from './../../../services/deleteDisappearance.service';
import { UpdateDisappearanceService } from './../../../services/updateDisappearance.service';
import { CreateDisappearanceService } from './../../../services/createDisappearanceService.service';
import { ListDisappearancesService } from './../../../services/listDisappearances.service';

import { ICreateDisappearanceDTO } from '../../../dtos/ICreateDisappearanceDTO';
import {
  Controller,
  HttpCode,
  Get,
  Post,
  Body,
  Query,
  Put,
  Param,
  Delete,
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
import { Disappearance } from '../typeorm/entities/disappearance.entity';
import { IListDisappearancesParams } from '../../../dtos/IListDisappearancesParams';
import { Request } from 'express';
import { ListDisappearancesByUserService } from '../../../services/listDisappearancesByUser.service';

@Controller('disappearances')
export class DisappearancesController {
  constructor(
    private getDisappearanceService: GetDisappearanceService,
    private listDisappearanceService: ListDisappearancesService,
    private createDisappearanceService: CreateDisappearanceService,
    private updateDisappearanceService: UpdateDisappearanceService,
    private deleteDisappearanceService: DeleteDisappearanceService,
    private listDisappearanceByUserService: ListDisappearancesByUserService,
  ) {}

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
    @Query() params: IListDisappearancesParams,
  ): Promise<Disappearance[]> {
    const response = await this.listDisappearanceService.execute(params);

    return response;
  }

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
    @Query() params: IListDisappearancesParams,
    @Req() request: Request,
  ): Promise<Disappearance[]> {
    const { id: user_id } = request.user;

    const response = await this.listDisappearanceByUserService.execute({
      user_id,
      ...params,
    });

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
    type: ICreateDisappearanceDTO,
  })
  async create(
    @Body() data: ICreateDisappearanceDTO,
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
    type: ICreateDisappearanceDTO,
  })
  @ApiBearerAuth()
  @ApiTags('disappearances')
  @ApiOkResponse({
    description: 'The disappearance has been successfully updated.',
    type: Disappearance,
  })
  async update(
    @Param('id') id: string,
    @Body() data: ICreateDisappearanceDTO,
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
