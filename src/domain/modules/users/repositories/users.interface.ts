import { UserModel } from '../models';
import { UpdateUserDto, CreateUserDto } from '../dtos';

export interface UsersRepository {
  findById(id: string): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel>;
  createUser(data: CreateUserDto): Promise<UserModel>;
  updateUser(id: string, data: UpdateUserDto | UserModel): Promise<UserModel>;
}
