import { HttpException, Injectable } from '@nestjs/common';

import { ICreateUserAddressDTO } from '../dtos/ICreateUserAddressDTO';
import { UserAddress } from './../infra/typeorm/entities/userAddress.entity';
import { UsersAddressRepository } from '../infra/typeorm/repositories/usersAdress.repository';

@Injectable()
export class CreateUserAddressService {
  constructor(private usersAddressRepository: UsersAddressRepository) {}

  async execute(data: ICreateUserAddressDTO): Promise<UserAddress> {
    const userAddressExists = await this.usersAddressRepository.findByUserId(
      data.user_id,
    );

    if (userAddressExists) {
      throw new HttpException('User address already exists', 409);
    }

    const userAddress = await this.usersAddressRepository.createUserAddress(
      data,
    );

    return userAddress;
  }
}
