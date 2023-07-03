import { UpdateUserService } from './update-user.service';
import { UsersRepositoryInMemory } from '../../repositories';
import { HttpException } from '../../../../exceptions/http-exception';

describe('Update user address', () => {
  let updateUserService: UpdateUserService;
  let usersRepository: UsersRepositoryInMemory;

  beforeAll(async () => {
    usersRepository = new UsersRepositoryInMemory();
    updateUserService = new UpdateUserService(usersRepository);

    vi.spyOn(Math, 'random').mockReturnValue(1);

    await usersRepository.createUser({
      email: 'gabriel.teixeira@dev.com',
      name: 'Gabriel',
      password: '12345678',
    });
  });

  it('should be able to update a user address', async () => {
    const user = await updateUserService.execute(String(1), {
      email: 'gabriel.teixeira@developer.com',
      name: 'Gabriel Test',
      phone: '519999999',
    });

    expect(user).have.ownProperty('id');
    expect(user.phone).toEqual('519999999');
    expect(user.name).toEqual('Gabriel Test');
  });

  it('should not be able to update a user if it does not exist', async () => {
    await expect(
      updateUserService.execute(String(10), {
        email: 'gabriel.teixeira@developer.com',
        name: 'Gabriel Test',
        phone: '519999999',
      }),
    ).rejects.toEqual(new HttpException('User not found', 404));
  });
});
