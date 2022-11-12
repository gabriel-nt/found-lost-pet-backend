import { HttpException, Injectable } from '@nestjs/common';

import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';
import { User } from '../infra/typeorm/entities/user.entity';
import { UsersRepository } from '../infra/typeorm/repositories/users.repository';

@Injectable()
export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string, data: IUpdateUserDTO): Promise<User> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) {
      throw new HttpException('Profile not found', 404);
    }

    const category = await this.usersRepository.updateUser(id, data);

    return category;
  }
}
