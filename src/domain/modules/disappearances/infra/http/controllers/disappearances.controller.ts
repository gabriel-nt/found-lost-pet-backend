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
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Disappearance } from '../typeorm/entities/disappearance.entity';
import { IListDisappearancesParams } from '../../../dtos/IListDisappearancesParams';
import { Request } from 'express';

@ApiBearerAuth()
@Controller('disappearances')
export class DisappearancesController {
  constructor(
    private listDisappearanceService: ListDisappearancesService,
    private createDisappearanceService: CreateDisappearanceService,
    private updateDisappearanceService: UpdateDisappearanceService,
    private deleteDisappearanceService: DeleteDisappearanceService,
  ) {}

  @Get('/')
  @HttpCode(200)
  @ApiTags('disappearances')
  @ApiOkResponse({
    schema: {
      items: { $ref: getSchemaPath(Disappearance) },
    },
  })
  async list(
    @Query() params: IListDisappearancesParams,
  ): Promise<Disappearance[]> {
    const response = await this.listDisappearanceService.execute(params);

    return response;
  }

  @Post('/')
  @HttpCode(201)
  @ApiTags('disappearances')
  @ApiCreatedResponse({
    description: 'The disappearance has been successfully created.',
    type: Disappearance,
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
  @ApiTags('disappearances')
  @ApiNoContentResponse({
    description: 'The disappearance has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteDisappearanceService.execute(id);
  }
}
