import { UserTokensModel } from '../models';
import { CreateUserTokenDto } from './../dtos';

export interface UserTokensRepository {
  createToken(data: CreateUserTokenDto): Promise<UserTokensModel>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokensModel>;
  deleteById(id: string): Promise<void>;
}
