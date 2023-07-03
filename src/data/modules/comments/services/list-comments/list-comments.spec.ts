import { ListCommentsService } from './list-comments.service';
import { CommentsRepositoryInMemory } from '../../repositories';

describe('List comments', () => {
  let listCommentsService: ListCommentsService;
  let commentsRepository: CommentsRepositoryInMemory;

  beforeEach(async () => {
    commentsRepository = new CommentsRepositoryInMemory();
    listCommentsService = new ListCommentsService(commentsRepository);
  });

  it('should be able to list the comments', async () => {
    await commentsRepository.createComment({
      description: 'Found',
      disappearance_id: '1',
      user_id: '1',
    });

    await commentsRepository.createComment({
      description: 'Lost',
      disappearance_id: '1',
      user_id: '1',
    });

    const comments = await listCommentsService.execute({});

    expect(comments).toHaveLength(2);
  });

  it('should be able to list the comments by disappearance id', async () => {
    await commentsRepository.createComment({
      description: 'Found',
      disappearance_id: '1',
      user_id: '1',
    });

    await commentsRepository.createComment({
      description: 'Lost',
      disappearance_id: '2',
      user_id: '1',
    });

    const comments = await listCommentsService.execute({
      disappearanceId: '2',
    });

    expect(comments).toHaveLength(1);
  });
});
