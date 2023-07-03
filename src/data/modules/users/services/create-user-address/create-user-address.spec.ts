import { HttpException } from '../../../../exceptions/http-exception';
import { UserAddressRepositoryInMemory } from '../../repositories';
import { CreateUserAddressService } from './create-user-address.service';

describe('Create user address', () => {
  let createUserAddressService: CreateUserAddressService;
  let userAddressRepository: UserAddressRepositoryInMemory;

  beforeAll(() => {
    userAddressRepository = new UserAddressRepositoryInMemory();
    createUserAddressService = new CreateUserAddressService(
      userAddressRepository,
    );
  });

  it('should be able to create a user address', async () => {
    const userAddress = await createUserAddressService.execute({
      user_id: '74f02d91-f7c8-4e9a-839d-d9d7a424a8cf',
      city: 'Gramado',
      uf: 'RS',
      latitude: -29.3688,
      longitude: -50.8786,
    });

    expect(userAddress).have.haveOwnProperty('id');
    expect(userAddress.city).toEqual('Gramado');
  });

  it('should not be able to create a user address if it does already exist', async () => {
    userAddressRepository.userAddresses = [];

    await createUserAddressService.execute({
      user_id: '74f02d91-f7c8-4e9a-839d-d9d7a424a8cf',
      city: 'Gramado',
      uf: 'RS',
      latitude: -29.3688,
      longitude: -50.8786,
    });

    await expect(
      createUserAddressService.execute({
        user_id: '74f02d91-f7c8-4e9a-839d-d9d7a424a8cf',
        city: 'Taquara',
        uf: 'RS',
        latitude: -29.6422,
        longitude: -50.7956,
      }),
    ).rejects.toEqual(new HttpException('User address already exists', 409));
  });
});
