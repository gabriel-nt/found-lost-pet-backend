import { HttpException, Injectable } from '@nestjs/common';

import { UsersRepository } from '../infra/typeorm/repositories/users.repository';
import { User } from '../infra/typeorm/entities/user.entity';

@Injectable()
export class GetUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<User> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    const user = await this.usersRepository.findById(id);

    return user;
  }
}
