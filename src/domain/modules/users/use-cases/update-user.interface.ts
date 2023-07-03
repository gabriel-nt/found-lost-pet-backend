import { UserModel } from '../models';
import { UpdateUserDto } from './../dtos';

export interface UpdateUserUseCase {
  execute: (id: string, data: UpdateUserDto) => Promise<UserModel>;
}
