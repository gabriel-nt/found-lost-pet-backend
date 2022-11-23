import { hash } from 'bcryptjs';
import { HttpException, Injectable } from '@nestjs/common';

import { IResetPasswordDTO } from '../dtos/IResetPasswordDTO';
import { UsersRepository } from '../infra/typeorm/repositories/users.repository';

@Injectable()
export class ResetPasswordService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
    password_confirmation,
  }: IResetPasswordDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('User does not exist', 404);
    }

    if (!password) {
      throw new HttpException(
        'You need to inform the password to set a new password',
        400,
      );
    }

    if (!password_confirmation) {
      throw new HttpException(
        'You need to inform the confirm password to set a new password',
        400,
      );
    }

    if (password !== password_confirmation) {
      throw new HttpException('You need to inform the same passwords', 409);
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user);
  }
}
