import { ICreateUserAddressDTO } from './../../../dtos/ICreateUserAddressDTO';

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IUsersAddressRepository } from '../../../repositories/IUsersAddress';
import { UserAddress } from '../entities/userAddress.entity';

@Injectable()
export class UsersAddressRepository implements IUsersAddressRepository {
  constructor(
    @InjectRepository(UserAddress)
    private repository: Repository<UserAddress>,
  ) {}

  async findByUserId(user_id: string): Promise<UserAddress> {
    const user = await this.repository.findOne({
      where: {
        user_id,
      },
    });

    return user;
  }

  async findById(id: string): Promise<UserAddress> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async createUserAddress({
    city,
    district,
    neighborhood,
    number,
    state,
    street,
    zipCode,
    user_id,
    latitude,
    longitude,
    complement,
  }: ICreateUserAddressDTO): Promise<UserAddress> {
    const userAddress = this.repository.create({
      city,
      district,
      neighborhood,
      number,
      state,
      street,
      zipCode,
      user_id,
      latitude,
      longitude,
      complement,
    });

    await this.repository.save(userAddress);

    return userAddress;
  }

  async updateUserAddress(
    id: string,
    {
      city,
      district,
      neighborhood,
      number,
      state,
      street,
      zipCode,
      user_id,
      latitude,
      longitude,
      complement,
    }: ICreateUserAddressDTO,
  ): Promise<UserAddress> {
    const userAddress = await this.repository.findOne({
      where: {
        id,
      },
    });

    Object.assign(userAddress, {
      city,
      district,
      neighborhood,
      number,
      state,
      street,
      zipCode,
      user_id,
      latitude,
      longitude,
      complement,
    });

    await this.repository.save(userAddress);

    return userAddress;
  }

  async deleteUserAddress(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
