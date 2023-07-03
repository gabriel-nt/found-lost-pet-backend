import { HttpException } from '../../../../exceptions/http-exception';
import { UserModel } from '../../../../../domain/modules/users/models';
import { GetUserUseCase } from '../../../../../domain/modules/users/use-cases';
import { UsersRepository } from '../../../../../domain/modules/users/repositories';

export class GetUserService implements GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<UserModel> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    const user = await this.usersRepository.findById(id);

    return user;
  }
}
