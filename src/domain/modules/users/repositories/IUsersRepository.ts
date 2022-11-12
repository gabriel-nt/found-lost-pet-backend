import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';
import { User } from '../infra/typeorm/entities/user.entity';

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  createUser(data: ICreateUserDTO): Promise<User>;
  updateUser(id: string, data: IUpdateUserDTO): Promise<User>;
}

export { IUsersRepository };
