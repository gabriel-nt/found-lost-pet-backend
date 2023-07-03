import { HttpException } from '../../../../exceptions/http-exception';
import { ListDisappearancesService } from './list-disappearances.service';
import { DisappearanceModel } from './../../../../../domain/modules/disappearances/models';
import { DisappearancesRepositoryInMemory } from './../../../disappearances/repositories';

describe('List disappearances', () => {
  let mockedDisappearance: DisappearanceModel;
  let listDisappearanceService: ListDisappearancesService;
  let disappearancesRepository: DisappearancesRepositoryInMemory;

  beforeEach(async () => {
    vi.useFakeTimers();

    disappearancesRepository = new DisappearancesRepositoryInMemory();

    listDisappearanceService = new ListDisappearancesService(
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

  it('should be able to return a list of disappearance', async () => {
    const disappearances = await listDisappearanceService.execute({
      initialDate: new Date().toISOString(),
      finalDate: new Date().toISOString(),
    });

    expect(disappearances).toBeDefined();
    expect(disappearances).toHaveLength(1);
  });
});
