import {
  CreateUserDto,
  UpdateUserDto,
} from '../../../../domain/modules/users/dtos';
import { UserModel } from '../../../../domain/modules/users/models';
import { UsersRepository } from '../../../../domain/modules/users/repositories';

export class UsersRepositoryInMemory implements UsersRepository {
  users: UserModel[] = [];

  async findById(id: string): Promise<UserModel> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<UserModel> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async createUser({
    email,
    name,
    password,
    phone,
  }: CreateUserDto): Promise<UserModel> {
    const user: UserModel = {
      email,
      name,
      password,
      phone,
      created_at: new Date(),
      id: Math.random().toString(),
    };

    this.users.push(user);

    return user;
  }

  async updateUser(
    id: string,
    data: UpdateUserDto | UserModel,
  ): Promise<UserModel> {
    const user = this.users.find((user) => user.id === id);
    const findIndex = this.users.findIndex((user) => user.id === id);

    Object.assign(user, {
      ...data,
    });

    this.users[findIndex] = user;

    return user;
  }
}
