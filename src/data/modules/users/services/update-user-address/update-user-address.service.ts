import { HttpException } from '../../../../exceptions/http-exception';
import { CreateUserAddressDto } from '../../../../../domain/modules/users/dtos';
import { UserAddressModel } from '../../../../../domain/modules/users/models';
import { UserAddressRepository } from '../../../../../domain/modules/users/repositories';
import { UpdateUserAddressUseCase } from '../../../../../domain/modules/users/use-cases';

export class UpdateUserAddressService implements UpdateUserAddressUseCase {
  constructor(private usersAddressRepository: UserAddressRepository) {}

  async execute(
    id: string,
    data: CreateUserAddressDto,
  ): Promise<UserAddressModel> {
    const findUserAddress = await this.usersAddressRepository.findById(id);

    if (!findUserAddress) {
      throw new HttpException('User address not found', 404);
    }

    const userAddress = await this.usersAddressRepository.updateUserAddress(
      id,
      data,
    );

    return userAddress;
  }
}
