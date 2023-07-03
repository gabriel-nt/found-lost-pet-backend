import { CreateUserDto } from '../../../../../domain/modules/users/dtos';
import { UserModel } from '../../../../../domain/modules/users/models';
import { UsersRepository } from '../../../../../domain/modules/users/repositories';
import { HttpException } from '../../../../exceptions/http-exception';
import { BcryptProvider } from '../../../../providers';
import { CreateUserUseCase } from '../../../../../domain/modules/users/use-cases';

export class CreateUserService implements CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private bcryptProvider: BcryptProvider,
  ) {}

  async execute({
    email,
    name,
    password,
    phone,
  }: CreateUserDto): Promise<UserModel> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new HttpException('User already exists', 409);
    }

    const passwordHash = await this.bcryptProvider.hash(password, 8);

    const user = await this.usersRepository.createUser({
      email,
      name,
      phone,
      password: passwordHash,
    });

    return user;
  }
}
