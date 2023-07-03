import { BcryptProvider } from '../../../../providers';
import { HttpException } from '../../../../exceptions/http-exception';
import { ResetPasswordDto } from '../../../../../domain/modules/users/dtos';
import { UsersRepository } from '../../../../../domain/modules/users/repositories';
import { ResetPasswordUseCase } from '../../../../../domain/modules/users/use-cases';

export class ResetPasswordService implements ResetPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private bcryptProvider: BcryptProvider,
  ) {}

  async execute({
    email,
    password,
    password_confirmation,
  }: ResetPasswordDto): Promise<void> {
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

    user.password = await this.bcryptProvider.hash(password, 8);

    await this.usersRepository.updateUser(user.id, user);
  }
}
