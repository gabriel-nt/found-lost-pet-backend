import { UserAddressModel } from '../models';
import { CreateUserAddressDto } from '../dtos';

export interface UpdateUserAddressUseCase {
  execute: (
    id: string,
    data: CreateUserAddressDto,
  ) => Promise<UserAddressModel>;
}
