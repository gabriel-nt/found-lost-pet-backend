import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserAddress } from '../entities/userAddress.entity';
import { ICreateUserAddressDTO } from './../../../dtos/ICreateUserAddressDTO';
import { IUsersAddressRepository } from '../../../repositories/IUsersAddress';

@Injectable()
export class UsersAddressRepository implements IUsersAddressRepository {
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
  }: ICreateUserAddressDTO): Promise<UserAddress> {
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
    { city, user_id, latitude, longitude, uf }: ICreateUserAddressDTO,
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
