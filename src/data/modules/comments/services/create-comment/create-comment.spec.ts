import { CreateCommentService } from './create-comment.service';
import { CommentsRepositoryInMemory } from '../../repositories';
import { DisappearanceModel } from '../../../../../domain/modules/disappearances/models';
import { DisappearancesRepositoryInMemory } from './../../../disappearances/repositories';
import { HttpException } from '../../../../exceptions/http-exception';

describe('Create comment', () => {
  let mockedDisappearance: DisappearanceModel;
  let createCommentService: CreateCommentService;
  let commentsRepository: CommentsRepositoryInMemory;
  let disappearancesRepository: DisappearancesRepositoryInMemory;

  beforeEach(async () => {
    commentsRepository = new CommentsRepositoryInMemory();
    disappearancesRepository = new DisappearancesRepositoryInMemory();

    createCommentService = new CreateCommentService(
      commentsRepository,
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

  it('should be able to create a comment', async () => {
    const comment = await createCommentService.execute({
      description: 'Pet found',
      disappearance_id: mockedDisappearance.id,
      user_id: '1',
    });

    const commentsLength = (await commentsRepository.findAll()).length;

    expect(commentsLength).toEqual(1);
    expect(comment.description).toEqual('Pet found');
  });

  it('should not be to create a comment if it already exists', async () => {
    await createCommentService.execute({
      description: 'Pet found',
      disappearance_id: mockedDisappearance.id,
      user_id: '1',
    });

    await expect(
      createCommentService.execute({
        description: 'Pet found',
        disappearance_id: mockedDisappearance.id,
        user_id: '1',
      }),
    ).rejects.toEqual(new HttpException('Comments already exists', 400));
  });
});
