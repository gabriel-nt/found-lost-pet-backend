import {
  UsersRepository,
  UserTokensRepository,
} from '../../../../../domain/modules/users/repositories';
import { HttpException } from '../../../../exceptions/http-exception';
import { AuthConfig } from '../../../../../domain/config/auth.config';
import { DateProvider } from '../../../../../domain/providers/date-provider';
import { CryptProvider, JwtProvider } from '../../../../../domain/providers';
import { AuthenticateUserDto } from '../../../../../domain/modules/users/dtos';
import { AuthenticateUserUseCase } from '../../../../../domain/modules/users/use-cases';
import { AuthenticateUserPresenter } from '../../../../../domain/modules/users/presenters';

class AuthenticateUserService implements AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokensRepository: UserTokensRepository,
    private dateProvider: DateProvider,
    private bcryptProvider: CryptProvider,
    private jwtProvider: JwtProvider,
    private authConfigService: AuthConfig,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserDto): Promise<AuthenticateUserPresenter> {
    const user = await this.usersRepository.findByEmail(email);

    const secret_token = this.authConfigService.getSecretToken();
    const expires_in_token = this.authConfigService.getExpiresInToken();
    const secret_refresh_token = this.authConfigService.getSecretRefreshToken();
    const expires_in_refresh_token =
      this.authConfigService.getExpiresInRefreshToken();
    const expires_refresh_token_days =
      this.authConfigService.getExpiresRefreshTokenDays();

    if (!user) {
      throw new HttpException('Email or password incorrect', 400);
    }

    const passwordMatch = await this.bcryptProvider.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new HttpException('Email or password incorrect', 400);
    }

    const refresh_token = this.jwtProvider.sign(
      { email },
      secret_refresh_token,
      {
        subject: user.id,
        expiresIn: expires_in_refresh_token,
      },
    );

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    await this.usersTokensRepository.createToken({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const token = this.jwtProvider.sign({ email }, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    return {
      token,
      refresh_token,
      user,
    };
  }
}

export { AuthenticateUserService };
