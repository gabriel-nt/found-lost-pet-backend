import { GetUserService } from './get-user.service';
import { UsersRepositoryInMemory } from '../../repositories';
import { HttpException } from '../../../../exceptions/http-exception';

describe('Get user', () => {
  let getUserService: GetUserService;
  let usersRepository: UsersRepositoryInMemory;

  beforeAll(async () => {
    usersRepository = new UsersRepositoryInMemory();
    getUserService = new GetUserService(usersRepository);

    vi.spyOn(Math, 'random').mockReturnValue(1);

    await usersRepository.createUser({
      email: 'gabriel.teixeira@dev.com',
      name: 'Gabriel',
      password: '12345678',
    });
  });

  it('should be able to create a user', async () => {
    const user = await getUserService.execute(String(1));

    expect(user).have.haveOwnProperty('id');
    expect(user.email).toEqual('gabriel.teixeira@dev.com');
  });

  it('should not be able to get a user if it does not exist', async () => {
    usersRepository.users = [];

    await expect(getUserService.execute(String(1))).rejects.toEqual(
      new HttpException('User not found', 404),
    );
  });
});
