import { DeleteCommentService } from './delete-comment.service';
import { CommentsRepositoryInMemory } from '../../repositories';
import { HttpException } from '../../../../exceptions/http-exception';

describe('Delete comment', () => {
  let deleteCommentService: DeleteCommentService;
  let commentsRepository: CommentsRepositoryInMemory;

  beforeEach(async () => {
    commentsRepository = new CommentsRepositoryInMemory();
    deleteCommentService = new DeleteCommentService(commentsRepository);
  });

  it('should be able to delete a comment', async () => {
    const comment = await commentsRepository.createComment({
      description: 'Found',
      disappearance_id: '1',
      user_id: '1',
    });

    await deleteCommentService.execute(comment.id);

    const commentsLength = (await commentsRepository.findAll()).length;

    expect(commentsLength).toEqual(0);
  });

  it('should not be to delete a comment if that is no exists', async () => {
    await expect(deleteCommentService.execute('2')).rejects.toEqual(
      new HttpException('Comment not found', 404),
    );
  });
});
