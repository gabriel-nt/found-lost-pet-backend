import { Request } from 'express';
import { Body, Controller, HttpCode, Inject, Post, Req } from '@nestjs/common';

import {
  ApiBody,
  ApiTags,
  ApiQuery,
  ApiHeader,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import {
  RefreshTokenUseCase,
  AuthenticateUserUseCase,
} from '../../../../domain/modules/users/use-cases';

import {
  RefreshTokenDto,
  AuthenticateUserDto,
} from './../../../../domain/modules/users/dtos';
import { AuthenticateUserPresenter } from './../../../../domain/modules/users/presenters';

@Controller('sessions')
export class AuthenticateController {
  constructor(
    @Inject('AuthenticateUserUseCase')
    private authenticateUserService: AuthenticateUserUseCase,

    @Inject('RefreshTokenUseCase')
    private refreshTokenService: RefreshTokenUseCase,
  ) {}

  @Post('/')
  @HttpCode(200)
  @ApiTags('sessions')
  @ApiOkResponse({
    type: AuthenticateUserPresenter,
    description: 'User authenticated successfully',
  })
  async create(
    @Body() data: AuthenticateUserDto,
  ): Promise<AuthenticateUserPresenter> {
    const response = await this.authenticateUserService.execute(data);

    return response;
  }

  @Post('/refresh-token')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiTags('sessions')
  @ApiOkResponse({
    type: AuthenticateUserPresenter,
    description: 'The refresh token has been successfully created.',
  })
  @ApiHeader({
    name: 'x-access-token',
    description: 'Access token',
    required: false,
  })
  @ApiQuery({
    name: 'token',
    description: 'Access token',
    required: false,
  })
  @ApiBody({
    required: false,
    // type: RefreshTokenDto,
  })
  async generateRefreshToken(
    @Req() request: Request,
  ): Promise<AuthenticateUserPresenter> {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers['x-access-token'];

    const response = await this.refreshTokenService.execute(token);

    return response;
  }
}
