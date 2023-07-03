import { HttpException } from '../../../../exceptions/http-exception';
import { DisappearanceModel } from './../../../../../domain/modules/disappearances/models';
import { DeleteDisappearanceService } from './delete-disappearance.service';
import { DisappearancesRepositoryInMemory } from './../../../disappearances/repositories';

describe('Delete disappearance', () => {
  let mockedDisappearance: DisappearanceModel;
  let deleteDisappearanceService: DeleteDisappearanceService;
  let disappearancesRepository: DisappearancesRepositoryInMemory;

  beforeEach(async () => {
    disappearancesRepository = new DisappearancesRepositoryInMemory();

    deleteDisappearanceService = new DeleteDisappearanceService(
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

  it('should be able to delete a disappearance', async () => {
    await deleteDisappearanceService.execute(mockedDisappearance.id);

    expect(deleteDisappearanceService).toBeDefined();
  });

  it('should not be to delete a disappearance if it does not exist', async () => {
    await expect(
      deleteDisappearanceService.execute('mockedDisappearance.id'),
    ).rejects.toEqual(new HttpException('Disappearance not found', 404));
  });
});
