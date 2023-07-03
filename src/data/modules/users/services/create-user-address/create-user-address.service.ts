import { HttpException } from '../../../../exceptions/http-exception';
import { UserAddressModel } from '../../../../../domain/modules/users/models';
import { CreateUserAddressDto } from '../../../../../domain/modules/users/dtos';
import { CreateUserAddressUseCase } from '../../../../../domain/modules/users/use-cases';
import { UserAddressRepository } from '../../../../../domain/modules/users/repositories';

export class CreateUserAddressService implements CreateUserAddressUseCase {
  constructor(private usersAddressRepository: UserAddressRepository) {}

  async execute(data: CreateUserAddressDto): Promise<UserAddressModel> {
    const userAddressExists = await this.usersAddressRepository.findByUserId(
      data.user_id,
    );

    if (userAddressExists) {
      throw new HttpException('User address already exists', 409);
    }

    const userAddress = await this.usersAddressRepository.createUserAddress(
      data,
    );

    return userAddress;
  }
}
