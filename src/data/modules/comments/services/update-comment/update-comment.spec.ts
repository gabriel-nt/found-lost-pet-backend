import { UpdateCommentService } from './update-comment.service';
import { CommentsRepositoryInMemory } from '../../repositories';
import { HttpException } from '../../../../exceptions/http-exception';
import { DisappearanceModel } from '../../../../../domain/modules/disappearances/models';
import { DisappearancesRepositoryInMemory } from '../../../disappearances/repositories';

describe('Update comment', () => {
  let mockedDisappearance: DisappearanceModel;
  let updateCommentService: UpdateCommentService;
  let commentsRepository: CommentsRepositoryInMemory;
  let disappearancesRepository: DisappearancesRepositoryInMemory;

  beforeEach(async () => {
    commentsRepository = new CommentsRepositoryInMemory();
    updateCommentService = new UpdateCommentService(commentsRepository);
    disappearancesRepository = new DisappearancesRepositoryInMemory();

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

  it('should be able to update a comment', async () => {
    const comment = await commentsRepository.createComment({
      description: 'Pet found',
      disappearance_id: mockedDisappearance.id,
      user_id: '1',
    });

    const updatedComment = await updateCommentService.execute(comment.id, {
      ...comment,
      description: 'Pet lost',
    });

    expect(updatedComment).toHaveProperty('id');
    expect(updatedComment.description).toEqual('Pet lost');
  });

  it('should not be to create a update if it no exists', async () => {
    await expect(
      updateCommentService.execute('3', {
        description: 'Pet found',
        disappearance_id: '1',
        user_id: '1',
      }),
    ).rejects.toEqual(new HttpException('Comment not found', 404));
  });
});
