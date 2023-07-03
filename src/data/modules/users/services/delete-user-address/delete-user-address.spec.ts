import { UserAddressRepositoryInMemory } from '../../repositories';
import { HttpException } from '../../../../exceptions/http-exception';
import { DeleteUserAddressService } from './delete-user-address.service';

describe('Delete user address', () => {
  let deleteUserAddressService: DeleteUserAddressService;
  let userAddressRepository: UserAddressRepositoryInMemory;

  beforeAll(async () => {
    userAddressRepository = new UserAddressRepositoryInMemory();
    deleteUserAddressService = new DeleteUserAddressService(
      userAddressRepository,
    );

    vi.spyOn(Math, 'random').mockReturnValue(1);

    await userAddressRepository.createUserAddress({
      user_id: '74f02d91-f7c8-4e9a-839d-d9d7a424a8cf',
      city: 'Gramado',
      uf: 'RS',
      latitude: -29.3688,
      longitude: -50.8786,
    });
  });

  it('should be able to delete a user address', async () => {
    await deleteUserAddressService.execute(String(1));

    expect(deleteUserAddressService).toBeDefined();
  });

  it('should not be able to delete a user address if it does not exist', async () => {
    await expect(deleteUserAddressService.execute(String(2))).rejects.toEqual(
      new HttpException('User address not found', 404),
    );
  });
});
