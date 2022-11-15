import { HttpException, Injectable } from '@nestjs/common';

import { ICreateUserAddressDTO } from '../dtos/ICreateUserAddressDTO';
import { UserAddress } from './../infra/typeorm/entities/userAddress.entity';
import { UsersAddressRepository } from '../infra/typeorm/repositories/usersAdress.repository';

@Injectable()
export class UpdateUserAddressService {
  constructor(private usersAddressRepository: UsersAddressRepository) {}

  async execute(id: string, data: ICreateUserAddressDTO): Promise<UserAddress> {
    const findUserAddress = await this.usersAddressRepository.findById(id);

    if (!findUserAddress) {
      throw new HttpException('User address not found', 404);
    }

    const userAddress = await this.usersAddressRepository.updateUserAddress(
      id,
      data,
    );

    return userAddress;
  }
}
