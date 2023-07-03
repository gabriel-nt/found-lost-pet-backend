import { CreateDisappearanceService } from './create-disappearance.service';
import { DisappearancesRepositoryInMemory } from './../../../disappearances/repositories';
import { HttpException } from '../../../../exceptions/http-exception';

describe('Create disappearance', () => {
  let createDisappearanceService: CreateDisappearanceService;
  let disappearancesRepository: DisappearancesRepositoryInMemory;

  beforeEach(async () => {
    disappearancesRepository = new DisappearancesRepositoryInMemory();

    createDisappearanceService = new CreateDisappearanceService(
      disappearancesRepository,
    );
  });

  afterEach(() => {
    disappearancesRepository.disappearances = [];
  });

  it('should be able to create a disappearance', async () => {
    const disappearance = await createDisappearanceService.execute({
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

    expect(disappearance).toHaveProperty('id');
    expect(disappearance.situation).toEqual('FOUND');
  });

  it('should not be to create a disappearance if it does not exists', async () => {
    await createDisappearanceService.execute({
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

    await expect(
      createDisappearanceService.execute({
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
      }),
    ).rejects.toEqual(new HttpException('Comments already exists', 400));
  });
});
