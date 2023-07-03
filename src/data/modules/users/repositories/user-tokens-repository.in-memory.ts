import { UserTokensModel } from '../../../../domain/modules/users/models';
import { CreateUserTokenDto } from '../../../../domain/modules/users/dtos';
import { UserTokensRepository } from '../../../../domain/modules/users/repositories';

export class UserTokensRepositoryInMemory implements UserTokensRepository {
  userTokens: UserTokensModel[] = [];

  async createToken({
    expires_date,
    refresh_token,
    user_id,
  }: CreateUserTokenDto): Promise<UserTokensModel> {
    const userToken: UserTokensModel = {
      expires_date,
      refresh_token,
      user_id,
      created_at: new Date(),
      id: Math.random().toString(),
    };

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokensModel> {
    const userToken = this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token,
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userTokensArray = new Set(this.userTokens);

    userTokensArray.delete(
      this.userTokens.find((userToken) => userToken.id === id),
    );

    this.userTokens = Array.from(userTokensArray);
  }
}
