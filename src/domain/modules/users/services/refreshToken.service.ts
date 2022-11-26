import { sign, verify } from 'jsonwebtoken';
import { HttpException, Injectable } from '@nestjs/common';

import auth from '../../../../infra/config/auth/auth';

import { IAuthenticateUserResponse } from '../dtos/IAuthenticateUserResponse';
import { UsersRepository } from '../infra/typeorm/repositories/users.repository';
import { UserTokensRepository } from '../infra/typeorm/repositories/userTokens.repository';
import { DayjsDateProvider } from '../../../../infra/provider/DateProvider/implementations/DayjsDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

@Injectable()
class RefreshTokenService {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokensRepository: UserTokensRepository,
    private dateProvider: DayjsDateProvider,
  ) {}

  async execute(token: string): Promise<IAuthenticateUserResponse> {
    const { email, sub: user_id } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayload;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new HttpException('User does not exists!', 400);
    }

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new HttpException('Refresh Token does not exists!', 400);
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    );

    await this.usersTokensRepository.createToken({
      user_id,
      expires_date,
      refresh_token,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
      user,
    };
  }
}

export { RefreshTokenService };
