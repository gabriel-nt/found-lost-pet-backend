import { UserModel } from '../models';

export interface GetUserUseCase {
  execute: (id: string) => Promise<UserModel>;
}
