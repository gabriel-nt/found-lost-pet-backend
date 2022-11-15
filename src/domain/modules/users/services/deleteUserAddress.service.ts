import { HttpException, Injectable } from '@nestjs/common';
import { UsersAddressRepository } from '../infra/typeorm/repositories/usersAdress.repository';

@Injectable()
export class DeleteUserAddressService {
  constructor(private usersAddressRepository: UsersAddressRepository) {}

  async execute(id: string): Promise<void> {
    const findUserAddress = await this.usersAddressRepository.findById(id);

    if (!findUserAddress) {
      throw new HttpException('User address not found', 404);
    }

    await this.usersAddressRepository.deleteUserAddress(id);
  }
}
