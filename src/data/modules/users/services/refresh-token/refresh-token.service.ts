import {
  UsersRepository,
  UserTokensRepository,
} from '../../../../../domain/modules/users/repositories';

import { HttpException } from '../../../../exceptions/http-exception';
import { AuthConfig } from '../../../../../domain/config/auth.config';
import { DateProvider, JwtProvider } from '../../../../../domain/providers';
import { AuthenticateUserPresenter } from '../../../../../domain/modules/users/presenters';
import { RefreshTokenUseCase } from '../../../../../domain/modules/users/use-cases';

interface IPayload {
  sub: string;
  email: string;
}

class RefreshTokenService implements RefreshTokenUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokensRepository: UserTokensRepository,
    private dateProvider: DateProvider,
    private jwtProvider: JwtProvider,
    private authConfigService: AuthConfig,
  ) {}

  async execute(token: string): Promise<AuthenticateUserPresenter> {
    const { email, sub: user_id } = this.jwtProvider.verify<IPayload>(
      token,
      this.authConfigService.getSecretRefreshToken(),
    );

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new HttpException('Invalid token!', 400);
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

    const refresh_token = this.jwtProvider.sign(
      { email },
      this.authConfigService.getSecretRefreshToken(),
      {
        subject: user_id,
        expiresIn: this.authConfigService.getExpiresInRefreshToken(),
      },
    );

    const expires_date = this.dateProvider.addDays(
      this.authConfigService.getExpiresRefreshTokenDays(),
    );

    await this.usersTokensRepository.createToken({
      user_id,
      expires_date,
      refresh_token,
    });

    const newToken = this.jwtProvider.sign(
      {},
      this.authConfigService.getSecretToken(),
      {
        subject: user_id,
        expiresIn: this.authConfigService.getExpiresInToken(),
      },
    );

    return {
      refresh_token,
      token: newToken,
      user,
    };
  }
}

export { RefreshTokenService };
