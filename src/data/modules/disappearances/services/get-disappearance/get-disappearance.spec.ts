import { HttpException } from '../../../../exceptions/http-exception';
import { GetDisappearanceService } from './get-disappearance.service';
import { DisappearanceModel } from './../../../../../domain/modules/disappearances/models';
import { DisappearancesRepositoryInMemory } from './../../../disappearances/repositories';

describe('Get disappearance', () => {
  let mockedDisappearance: DisappearanceModel;
  let getDisappearanceService: GetDisappearanceService;
  let disappearancesRepository: DisappearancesRepositoryInMemory;

  beforeEach(async () => {
    disappearancesRepository = new DisappearancesRepositoryInMemory();

    getDisappearanceService = new GetDisappearanceService(
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

  it('should be able to get a disappearance', async () => {
    const disappearance = await getDisappearanceService.execute(
      mockedDisappearance.id,
    );

    expect(disappearance).toHaveProperty('id');
    expect(disappearance.name).toEqual('Oryon');
    expect(disappearance.situation).toEqual('FOUND');
  });

  it('should not be to delete a disappearance if it does not exist', async () => {
    await expect(
      getDisappearanceService.execute('mockedDisappearance.id'),
    ).rejects.toEqual(new HttpException('Disappearance not found', 404));
  });
});
