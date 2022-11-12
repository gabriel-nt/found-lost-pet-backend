import { Request } from 'express';
import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';

import {
  ApiBody,
  ApiTags,
  ApiQuery,
  ApiHeader,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { IRefreshTokenDTO } from '../../../dtos/IRefreshTokenDTO';
import { IAuthenticateUserDTO } from '../../../dtos/IAuthenticateUserDTO';
import { RefreshTokenService } from '../../../services/refreshToken.service';
import { IAuthenticateUserResponse } from '../../../dtos/IAuthenticateUserResponse';
import { AuthenticateUserService } from '../../../services/authenticateUser.service';

@Controller('sessions')
export class AuthenticateController {
  constructor(
    private authenticateUserService: AuthenticateUserService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  @Post('/')
  @HttpCode(200)
  @ApiTags('sessions')
  @ApiOkResponse({
    type: IAuthenticateUserResponse,
    description: 'User authenticated successfully',
  })
  async create(
    @Body() data: IAuthenticateUserDTO,
  ): Promise<IAuthenticateUserResponse> {
    const response = await this.authenticateUserService.execute(data);

    return response;
  }

  @Post('/refresh-token')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiTags('sessions')
  @ApiOkResponse({
    type: IAuthenticateUserResponse,
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
    type: IRefreshTokenDTO,
  })
  async generateRefreshToken(
    @Req() request: Request,
  ): Promise<IAuthenticateUserResponse> {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers['x-access-token'];

    const response = await this.refreshTokenService.execute(token);

    return response;
  }
}
