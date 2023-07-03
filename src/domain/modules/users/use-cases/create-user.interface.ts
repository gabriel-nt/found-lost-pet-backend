import { UserModel } from '../models';
import { CreateUserDto } from '../dtos';

export interface CreateUserUseCase {
  execute: (data: CreateUserDto) => Promise<UserModel>;
}
