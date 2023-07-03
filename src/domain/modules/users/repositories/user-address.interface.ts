import { UserAddressModel } from '../models';
import { CreateUserAddressDto } from '../dtos';

export interface UserAddressRepository {
  findByUserId(user_id: string): Promise<UserAddressModel>;
  findById(id: string): Promise<UserAddressModel>;
  createUserAddress(data: CreateUserAddressDto): Promise<UserAddressModel>;
  updateUserAddress(
    id: string,
    data: CreateUserAddressDto,
  ): Promise<UserAddressModel>;
  deleteUserAddress(id: string): Promise<void>;
}
