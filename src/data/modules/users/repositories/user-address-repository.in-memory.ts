import { UserAddressModel } from '../../../../domain/modules/users/models';
import { CreateUserAddressDto } from '../../../../domain/modules/users/dtos';
import { UserAddressRepository } from '../../../../domain/modules/users/repositories';

export class UserAddressRepositoryInMemory implements UserAddressRepository {
  userAddresses: UserAddressModel[] = [];

  async findByUserId(user_id: string): Promise<UserAddressModel> {
    const userAddress = this.userAddresses.find(
      (userAddress) => userAddress.user_id === user_id,
    );

    return userAddress;
  }

  async findById(id: string): Promise<UserAddressModel> {
    const userAddress = this.userAddresses.find(
      (userAddress) => userAddress.id === id,
    );

    return userAddress;
  }

  async createUserAddress({
    city,
    latitude,
    longitude,
    uf,
    user_id,
  }: CreateUserAddressDto): Promise<UserAddressModel> {
    const userAddress: UserAddressModel = {
      uf,
      city,
      user_id,
      latitude,
      longitude,
      created_at: new Date(),
      updated_at: new Date(),
      id: Math.random().toString(),
    };

    this.userAddresses.push(userAddress);

    return userAddress;
  }

  async updateUserAddress(
    id: string,
    data: CreateUserAddressDto,
  ): Promise<UserAddressModel> {
    const userAddress = this.userAddresses.find(
      (userAddress) => userAddress.id === id,
    );

    const findIndex = this.userAddresses.findIndex(
      (userAddress) => userAddress.id === id,
    );

    Object.assign(userAddress, {
      ...data,
    });

    this.userAddresses[findIndex] = userAddress;

    return userAddress;
  }

  async deleteUserAddress(id: string): Promise<void> {
    const userAddressArray = new Set(this.userAddresses);

    userAddressArray.delete(
      this.userAddresses.find((userAddress) => userAddress.id === id),
    );

    this.userAddresses = Array.from(userAddressArray);
  }
}
