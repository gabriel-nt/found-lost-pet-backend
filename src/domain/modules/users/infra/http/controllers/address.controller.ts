import { DeleteUserAddressService } from './../../../services/deleteUserAddress.service';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserAddress } from '../../typeorm/entities/userAddress.entity';
import { ICreateUserAddressDTO } from '../../../dtos/ICreateUserAddressDTO';
import { Request } from 'express';
import { CreateUserAddressService } from '../../../services/createUserAddress.service';
import { UpdateUserAddressService } from '../../../services/updateUserAddress.service';

@Controller('users/address')
export class AddressController {
  constructor(
    private createUserAddressService: CreateUserAddressService,
    private updateUserAddressService: UpdateUserAddressService,
    private deleteUserAddressService: DeleteUserAddressService,
  ) {}

  @Post('/')
  @HttpCode(201)
  @ApiTags('users')
  @ApiCreatedResponse({
    type: UserAddress,
    description: 'The user address has been successfully created.',
  })
  async create(@Body() data: ICreateUserAddressDTO): Promise<UserAddress> {
    return await this.createUserAddressService.execute(data);
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiTags('users')
  @ApiOkResponse({
    type: UserAddress,
    description: 'The user has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() data: ICreateUserAddressDTO,
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
