import { hash } from 'bcryptjs';
import { HttpException, Injectable } from '@nestjs/common';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

import { UsersRepository } from '../infra/typeorm/repositories/users.repository';
import { User } from '../infra/typeorm/entities/user.entity';

@Injectable()
export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new HttpException('User already exists', 409);
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.createUser({
      email,
      name,
      password: passwordHash,
    });

    return user;
  }
}
