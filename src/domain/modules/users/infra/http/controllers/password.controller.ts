import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';

import { IResetPasswordDTO } from './../../../dtos/IResetPasswordDTO';
import { ResetPasswordService } from './../../../services/resetPassword.service';

@Controller('password')
export class PasswordController {
  constructor(private resetPasswordService: ResetPasswordService) {}

  @Post('/reset')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiTags('users')
  @ApiBody({
    type: IResetPasswordDTO,
  })
  @ApiNoContentResponse()
  async resetPassword(@Body() data: IResetPasswordDTO): Promise<void> {
    await this.resetPasswordService.execute(data);
  }
}
