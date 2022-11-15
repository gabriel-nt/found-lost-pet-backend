import { IUpdateUserDTO } from './../../../dtos/IUpdateUserDTO';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../../repositories/IUsersRepository';

@Injectable()
export class UsersRepository implements IUsersRepository {
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

  async createUser({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  async updateUser(id: string, { email, name }: IUpdateUserDTO): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['address'],
    });

    Object.assign(user, {
      email,
      name,
    });

    await this.repository.save(user);

    return user;
  }
}
