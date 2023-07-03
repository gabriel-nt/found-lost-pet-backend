import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserAddress } from '../entities/userAddress.entity';
import { CreateUserAddressDto } from './../../../../domain/modules/users/dtos';
import { UserAddressRepository as UserAddressRepositoryInterface } from '../../../../domain/modules/users/repositories';

@Injectable()
export class UsersAddressRepository implements UserAddressRepositoryInterface {
  constructor(
    @InjectRepository(UserAddress)
    private repository: Repository<UserAddress>,
  ) {}

  async findByUserId(user_id: string): Promise<UserAddress> {
    const userAddress = await this.repository.findOne({
      where: {
        user_id,
      },
    });

    return userAddress;
  }

  async findById(id: string): Promise<UserAddress> {
    const userAddress = await this.repository.findOne({
      where: {
        id,
      },
    });

    return userAddress;
  }

  async createUserAddress({
    city,
    user_id,
    latitude,
    longitude,
    uf,
  }: CreateUserAddressDto): Promise<UserAddress> {
    const userAddress = this.repository.create({
      city,
      user_id,
      latitude,
      longitude,
      uf,
    });

    await this.repository.save(userAddress);

    return userAddress;
  }

  async updateUserAddress(
    id: string,
    { city, user_id, latitude, longitude, uf }: CreateUserAddressDto,
  ): Promise<UserAddress> {
    const userAddress = await this.repository.findOne({
      where: {
        id,
      },
    });

    Object.assign(userAddress, {
      city,
      uf,
      user_id,
      latitude,
      longitude,
    });

    await this.repository.save(userAddress);

    return userAddress;
  }

  async deleteUserAddress(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
