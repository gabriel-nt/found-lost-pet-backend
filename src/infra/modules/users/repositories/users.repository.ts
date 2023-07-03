import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';

import {
  CreateUserDto,
  UpdateUserDto,
} from '../../../../domain/modules/users/dtos';
import { UsersRepository as UsersRepositoryInterface } from '../../../../domain/modules/users/repositories';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
      relations: ['address'],
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['address'],
    });

    return user;
  }

  async createUser({
    email,
    name,
    password,
    phone,
  }: CreateUserDto): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      phone,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  async updateUser(
    id: string,
    { email, name, phone }: UpdateUserDto | User,
  ): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['address'],
    });

    Object.assign(user, {
      email,
      name,
      phone,
    });

    await this.repository.save(user);

    return user;
  }
}
