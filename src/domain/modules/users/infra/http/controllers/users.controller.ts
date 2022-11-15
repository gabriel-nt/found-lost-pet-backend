import { GetUserService } from './../../../services/getUser.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';

import { User } from '../../typeorm/entities/user.entity';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../../../dtos/IUpdateUserDTO';
import { CreateUserService } from '../../../services/createUser.service';
import { UpdateUserService } from '../../../services/updateUser.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
    private getUserService: GetUserService,
  ) {}

  @Get('/me')
  @HttpCode(200)
  @ApiTags('users')
  @ApiCreatedResponse({
    type: User,
  })
  async me(@Req() request: Request): Promise<User> {
    const { id } = request.user;

    return await this.getUserService.execute(id);
  }

  @Post('/')
  @HttpCode(201)
  @ApiTags('users')
  @ApiCreatedResponse({
    type: User,
    description: 'The user has been successfully created.',
  })
  async create(@Body() data: ICreateUserDTO): Promise<User> {
    return await this.createUserService.execute(data);
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiTags('users')
  @ApiOkResponse({
    type: User,
    description: 'The user has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() data: IUpdateUserDTO,
  ): Promise<User> {
    const response = await this.updateUserService.execute(id, data);

    return response;
  }
}
