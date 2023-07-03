import {
  UsersRepositoryInMemory,
  UserTokensRepositoryInMemory,
} from '../../repositories';

import {
  JwtProvider,
  BcryptProvider,
  DayJsDateProvider,
} from '../../../../providers';

import { CreateUserService } from '../create-user';
import { RefreshTokenService } from './refresh-token.service';
import { AuthenticateUserService } from '../authenticate-user';
import { AuthConfigService } from './../../../../config/auth.config';
import { HttpException } from '../../../../exceptions/http-exception';
import { AuthenticateUserPresenter } from '../../../../../domain/modules/users/presenters';

describe('Refresh Token', () => {
  let authResponse: AuthenticateUserPresenter;

  let jwtProvider: JwtProvider;
  let bcryptProvider: BcryptProvider;
  let dateProvider: DayJsDateProvider;
  let authConfigService: AuthConfigService;
  let createUserService: CreateUserService;
  let usersRepository: UsersRepositoryInMemory;
  let refreshTokenService: RefreshTokenService;
  let authenticateUserService: AuthenticateUserService;
  let userTokensRepository: UserTokensRepositoryInMemory;

  beforeEach(async () => {
    jwtProvider = new JwtProvider();
    bcryptProvider = new BcryptProvider();
    dateProvider = new DayJsDateProvider();
    authConfigService = new AuthConfigService();
    usersRepository = new UsersRepositoryInMemory();
    userTokensRepository = new UserTokensRepositoryInMemory();

    createUserService = new CreateUserService(usersRepository, bcryptProvider);

    authenticateUserService = new AuthenticateUserService(
      usersRepository,
      userTokensRepository,
      dateProvider,
      bcryptProvider,
      jwtProvider,
      authConfigService,
    );

    refreshTokenService = new RefreshTokenService(
      usersRepository,
      userTokensRepository,
      dateProvider,
      jwtProvider,
      authConfigService,
    );

    await createUserService.execute({
      email: 'gabriel.teixeira@dev.com',
      name: 'Gabriel',
      password: '12345678',
    });

    authResponse = await authenticateUserService.execute({
      email: 'gabriel.teixeira@dev.com',
      password: '12345678',
    });
  });

  it('should be able to refresh token', async () => {
    const authData = await refreshTokenService.execute(authResponse.token);

    expect(authData).have.haveOwnProperty('token');
    expect(authData).have.haveOwnProperty('refresh_token');
    expect(authData.user.name).toEqual('Gabriel');
  });

  it('should not be able to refresh token if user no exists', async () => {
    vi.spyOn(usersRepository, 'findById').mockResolvedValue(undefined);

    await expect(
      refreshTokenService.execute(authResponse.token),
    ).rejects.toEqual(new HttpException('Invalid token!', 400));
  });

  it('should not be able to refresh token if the user does not have a user token', async () => {
    vi.spyOn(
      userTokensRepository,
      'findByUserIdAndRefreshToken',
    ).mockResolvedValue(undefined);

    await expect(
      refreshTokenService.execute(authResponse.token),
    ).rejects.toEqual(new HttpException('Refresh Token does not exists!', 400));
  });
});
