import { HttpException } from '../../../../exceptions/http-exception';
import { BcryptProvider } from '../../../../providers';
import { UsersRepositoryInMemory } from '../../repositories';
import { CreateUserService } from './create-user.service';

describe('Create user', () => {
  let bcryptProvider: BcryptProvider;
  let createUserService: CreateUserService;
  let usersRepository: UsersRepositoryInMemory;

  beforeAll(() => {
    bcryptProvider = new BcryptProvider();
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository, bcryptProvider);
  });

  it('should be able to create a user', async () => {
    const user = await createUserService.execute({
      email: 'gabriel.teixeira@dev.com',
      name: 'Gabriel',
      password: '12345678',
    });

    expect(user).have.haveOwnProperty('id');
    expect(user.email).toEqual('gabriel.teixeira@dev.com');
  });

  it('should not be able to create a user with email already registered', async () => {
    await createUserService.execute({
      email: 'gabriel.teixeira@gmail.com',
      name: 'Gabriel',
      password: '12345678',
    });

    await expect(
      createUserService.execute({
        email: 'gabriel.teixeira@gmail.com',
        name: 'Gabriel',
        password: '12345678',
      }),
    ).rejects.toEqual(new HttpException('User already exists', 409));
  });
});
