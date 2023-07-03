import { UserAddressRepositoryInMemory } from '../../repositories';
import { HttpException } from '../../../../exceptions/http-exception';
import { UpdateUserAddressService } from './update-user-address.service';

describe('Update user address', () => {
  let updateUserAddressService: UpdateUserAddressService;
  let userAddressRepository: UserAddressRepositoryInMemory;

  beforeAll(async () => {
    userAddressRepository = new UserAddressRepositoryInMemory();
    updateUserAddressService = new UpdateUserAddressService(
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

  it('should be able to update a user address', async () => {
    const userAddress = await updateUserAddressService.execute(String(1), {
      user_id: '74f02d91-f7c8-4e9a-839d-d9d7a424a8cf',
      city: 'Taquara',
      uf: 'RS',
      latitude: -25.3688,
      longitude: -49.8786,
    });

    expect(userAddress).toBeDefined();
    expect(userAddress).haveOwnProperty('id');
    expect(userAddress.city).toEqual('Taquara');
  });

  it('should not be able to update a user address if it does not exist', async () => {
    await expect(
      updateUserAddressService.execute(String(90), {
        user_id: '74f02d91-f7c8-4e9a-839d-d9d7a424a8cf',
        city: 'Taquara',
        uf: 'RS',
        latitude: -25.3688,
        longitude: -49.8786,
      }),
    ).rejects.toEqual(new HttpException('User address not found', 404));
  });
});
