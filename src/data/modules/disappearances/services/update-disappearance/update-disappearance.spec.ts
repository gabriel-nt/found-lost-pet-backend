import { HttpException } from '../../../../exceptions/http-exception';
import { UpdateDisappearanceService } from './update-disappearance.service';
import { DisappearanceModel } from './../../../../../domain/modules/disappearances/models';
import { DisappearancesRepositoryInMemory } from './../../../disappearances/repositories';

describe('Update disappearance', () => {
  let mockedDisappearance: DisappearanceModel;
  let updateDisappearanceService: UpdateDisappearanceService;
  let disappearancesRepository: DisappearancesRepositoryInMemory;

  beforeEach(async () => {
    disappearancesRepository = new DisappearancesRepositoryInMemory();

    updateDisappearanceService = new UpdateDisappearanceService(
      disappearancesRepository,
    );

    mockedDisappearance = await disappearancesRepository.createDisappearance({
      description: 'Cachorro encontrado',
      city: 'Porto Alegre',
      image: 'https://picsum.photos/200/300',
      name: 'Oryon',
      situation: 'FOUND',
      type: 'Encontrado',
      uf: 'RS',
      email: 'oryon@oryon.com',
      phone: '51999999999',
      user_id: '1',
      latitude: -30.0277,
      longitude: -51.2287,
    });
  });

  afterEach(() => {
    disappearancesRepository.disappearances = [];
  });

  it('should be able to update a disappearance', async () => {
    const disappearance = await updateDisappearanceService.execute(
      mockedDisappearance.id,
      {
        user_id: '1',
        situation: 'SIGHTED',
      },
    );

    expect(disappearance).toHaveProperty('id');
    expect(disappearance.name).toEqual('Oryon');
    expect(disappearance.situation).toEqual('SIGHTED');
  });

  it('should not be to update a disappearance if the authenticated user is not the owner', async () => {
    await expect(
      updateDisappearanceService.execute(mockedDisappearance.id, {
        situation: 'SIGHTED',
        user_id: '2',
      }),
    ).rejects.toEqual(new HttpException('Unauthorized', 401));
  });

  it('should not be to update a disappearance if it does not exist', async () => {
    await expect(
      updateDisappearanceService.execute('mockedDisappearance.id', {
        situation: 'SIGHTED',
        user_id: '1',
      }),
    ).rejects.toEqual(new HttpException('Disappearance not found', 404));
  });
});
