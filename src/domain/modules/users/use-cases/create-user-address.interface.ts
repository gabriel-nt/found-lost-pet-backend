import { UserAddressModel } from '../models';
import { CreateUserAddressDto } from '../dtos';

export interface CreateUserAddressUseCase {
  execute: (data: CreateUserAddressDto) => Promise<UserAddressModel>;
}
