import { HttpException } from '../../../../exceptions/http-exception';
import { UserAddressRepository } from '../../../../../domain/modules/users/repositories';
import { DeleteUserAddressUseCase } from '../../../../../domain/modules/users/use-cases';

export class DeleteUserAddressService implements DeleteUserAddressUseCase {
  constructor(private usersAddressRepository: UserAddressRepository) {}

  async execute(id: string): Promise<void> {
    const findUserAddress = await this.usersAddressRepository.findById(id);

    if (!findUserAddress) {
      throw new HttpException('User address not found', 404);
    }

    await this.usersAddressRepository.deleteUserAddress(id);
  }
}
