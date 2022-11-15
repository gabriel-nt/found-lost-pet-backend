import { ICreateUserAddressDTO } from '../dtos/ICreateUserAddressDTO';
import { UserAddress } from '../infra/typeorm/entities/userAddress.entity';

export interface IUsersAddressRepository {
  findByUserId(user_id: string): Promise<UserAddress>;
  findById(id: string): Promise<UserAddress>;
  createUserAddress(data: ICreateUserAddressDTO): Promise<UserAddress>;
  updateUserAddress(
    id: string,
    data: ICreateUserAddressDTO,
  ): Promise<UserAddress>;
  deleteUserAddress(id: string): Promise<void>;
}
