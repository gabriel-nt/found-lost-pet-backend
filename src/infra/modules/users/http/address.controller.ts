import { Request } from 'express';

import {
  Put,
  Body,
  Req,
  Post,
  Param,
  Delete,
  Inject,
  HttpCode,
  Controller,
} from '@nestjs/common';

import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import {
  CreateUserAddressUseCase,
  UpdateUserAddressUseCase,
  DeleteUserAddressUseCase,
} from '../../../../domain/modules/users/use-cases';
import { UserAddress } from '../entities/userAddress.entity';
import { CreateUserAddressDto } from './../../../../domain/modules/users/dtos';

@Controller('users/address')
export class AddressController {
  constructor(
    @Inject('CreateUserAddressUseCase')
    private createUserAddressService: CreateUserAddressUseCase,

    @Inject('UpdateUserAddressUseCase')
    private updateUserAddressService: UpdateUserAddressUseCase,

    @Inject('DeleteUserAddressUseCase')
    private deleteUserAddressService: DeleteUserAddressUseCase,
  ) {}

  @Post('/')
  @HttpCode(201)
  @ApiTags('users')
  @ApiBody({
    // type: CreateUserAddressDto,
  })
  @ApiCreatedResponse({
    type: UserAddress,
    description: 'The user address has been successfully created.',
  })
  async create(@Body() data: CreateUserAddressDto): Promise<UserAddress> {
    return await this.createUserAddressService.execute(data);
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiBody({
    // type: CreateUserAddressDto,
  })
  @ApiTags('users')
  @ApiOkResponse({
    type: UserAddress,
    description: 'The user has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() data: CreateUserAddressDto,
    @Req() request: Request,
  ): Promise<UserAddress> {
    const { id: user_id } = request.user;

    const response = await this.updateUserAddressService.execute(id, {
      ...data,
      user_id,
    });

    return response;
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiTags('users')
  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'The user adddress has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUserAddressService.execute(id);
  }
}
