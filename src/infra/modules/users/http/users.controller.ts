import { Request } from 'express';

import {
  Get,
  Put,
  Req,
  Body,
  Post,
  Param,
  HttpCode,
  Controller,
  Inject,
} from '@nestjs/common';

import {
  ApiBody,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { User } from '../entities/user.entity';

import {
  CreateUserDto,
  UpdateUserDto,
} from './../../../../domain/modules/users/dtos';

import {
  GetUserUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
} from './../../../../domain/modules/users/use-cases';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('CreateUserUseCase')
    private createUserService: CreateUserUseCase,

    @Inject('UpdateUserUseCase')
    private updateUserService: UpdateUserUseCase,

    @Inject('GetUserUseCase')
    private getUserService: GetUserUseCase,
  ) {}

  @Get('/me')
  @HttpCode(200)
  @ApiBearerAuth()
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
  @ApiBody({
    // type: CreateUserDto,
  })
  async create(@Body() data: CreateUserDto): Promise<User> {
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
  @ApiBody({
    // type: UpdateUserDto,
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    const response = await this.updateUserService.execute(id, data);

    return response;
  }
}
