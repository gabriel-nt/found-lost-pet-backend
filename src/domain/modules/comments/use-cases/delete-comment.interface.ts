export interface DeleteCommentUseCase {
  execute: (id: string) => Promise<void>;
}
