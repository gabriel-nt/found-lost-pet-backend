import { AuthConfigService } from './../../../../config/auth.config';
import { HttpException } from '../../../../exceptions/http-exception';
import {
  JwtProvider,
  BcryptProvider,
  DayJsDateProvider,
} from '../../../../providers';
import {
  UsersRepositoryInMemory,
  UserTokensRepositoryInMemory,
} from '../../repositories';
import { CreateUserService } from '../create-user';
import { AuthenticateUserService } from './authenticate-user.service';

describe('Authenticate user', () => {
  let jwtProvider: JwtProvider;
  let bcryptProvider: BcryptProvider;
  let dateProvider: DayJsDateProvider;
  let authConfigService: AuthConfigService;
  let createUserService: CreateUserService;
  let usersRepository: UsersRepositoryInMemory;
  let authenticateUserService: AuthenticateUserService;
  let userTokensRepository: UserTokensRepositoryInMemory;

  beforeAll(async () => {
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

    await createUserService.execute({
      email: 'gabriel.teixeira@dev.com',
      name: 'Gabriel',
      password: '12345678',
    });
  });

  it('should be able to signIn', async () => {
    const authData = await authenticateUserService.execute({
      email: 'gabriel.teixeira@dev.com',
      password: '12345678',
    });

    expect(authData).have.haveOwnProperty('token');
    expect(authData).have.haveOwnProperty('refresh_token');
    expect(authData.user.name).toEqual('Gabriel');
  });

  it('should not be able to signIn if user no exists', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'gabriel.teixeira@gmail.com',
        password: '12345678',
      }),
    ).rejects.toEqual(new HttpException('Email or password incorrect', 400));
  });

  it('should not be able to signIn if the password or email are incorrect', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'gabriel.teixeira@dev.com',
        password: '123456',
      }),
    ).rejects.toEqual(new HttpException('Email or password incorrect', 400));
  });
});
