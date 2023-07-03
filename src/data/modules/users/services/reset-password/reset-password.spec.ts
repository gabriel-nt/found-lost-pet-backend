import { CreateUserService } from '../create-user';
import { BcryptProvider } from '../../../../providers';
import { UsersRepositoryInMemory } from '../../repositories';
import { ResetPasswordService } from './reset-password.service';
import { HttpException } from '../../../../exceptions/http-exception';

describe('Reset password', () => {
  let bcryptProvider: BcryptProvider;
  let createUserService: CreateUserService;
  let usersRepository: UsersRepositoryInMemory;
  let resetPasswordService: ResetPasswordService;

  beforeEach(async () => {
    bcryptProvider = new BcryptProvider();
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository, bcryptProvider);

    resetPasswordService = new ResetPasswordService(
      usersRepository,
      bcryptProvider,
    );

    await createUserService.execute({
      email: 'gabriel.teixeira@dev.com',
      name: 'Gabriel',
      password: '12345678',
    });
  });

  it('should be able to reset the password', async () => {
    await resetPasswordService.execute({
      email: 'gabriel.teixeira@dev.com',
      password: '12345678',
      password_confirmation: '12345678',
    });

    expect(resetPasswordService).toBeDefined();
  });

  it('should not be able to reset the password if user does not exist', async () => {
    await expect(
      resetPasswordService.execute({
        email: 'gabriel.nunes@dev.com',
        password: '12345678',
        password_confirmation: '12345678',
      }),
    ).rejects.toEqual(new HttpException('User does not exist', 404));
  });

  it('should not be able to refresh token if the new password was blank', async () => {
    await expect(
      resetPasswordService.execute({
        email: 'gabriel.teixeira@dev.com',
        password: undefined,
        password_confirmation: '12345678',
      }),
    ).rejects.toEqual(
      new HttpException(
        'You need to inform the password to set a new password',
        400,
      ),
    );
  });

  it('should not be able to refresh token if the new password confirmation was blank', async () => {
    await expect(
      resetPasswordService.execute({
        email: 'gabriel.teixeira@dev.com',
        password: '12345678',
        password_confirmation: undefined,
      }),
    ).rejects.toEqual(
      new HttpException(
        'You need to inform the password to set a new password',
        400,
      ),
    );
  });

  it('should not be able to refresh token if the new paswords was differents', async () => {
    await expect(
      resetPasswordService.execute({
        email: 'gabriel.teixeira@dev.com',
        password: '12345678',
        password_confirmation: '123456789',
      }),
    ).rejects.toEqual(
      new HttpException('You need to inform the same passwords', 409),
    );
  });
});
