import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';

import {
  ApiBody,
  ApiTags,
  ApiBearerAuth,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import { ResetPasswordDto } from './../../../../domain/modules/users/dtos';
import { ResetPasswordUseCase } from '../../../../domain/modules/users/use-cases';

@Controller('password')
export class PasswordController {
  constructor(
    @Inject('ResetPasswordUseCase')
    private resetPasswordService: ResetPasswordUseCase,
  ) {}

  @Post('/reset')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiTags('users')
  @ApiBody({
    // type: ResetPasswordDto,
  })
  @ApiNoContentResponse()
  async resetPassword(@Body() data: ResetPasswordDto): Promise<void> {
    await this.resetPasswordService.execute(data);
  }
}
