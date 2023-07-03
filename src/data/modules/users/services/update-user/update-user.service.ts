import { UserModel } from '../../../../../domain/modules/users/models';
import { UpdateUserDto } from '../../../../../domain/modules/users/dtos';
import { UsersRepository } from '../../../../../domain/modules/users/repositories';
import { UpdateUserUseCase } from '../../../../../domain/modules/users/use-cases';
import { HttpException } from '../../../../exceptions/http-exception';

export class UpdateUserService implements UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string, data: UpdateUserDto): Promise<UserModel> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    const user = await this.usersRepository.updateUser(id, data);

    return user;
  }
}
