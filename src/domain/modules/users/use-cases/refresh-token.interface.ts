import { AuthenticateUserPresenter } from './../presenters';

export interface RefreshTokenUseCase {
  execute: (token: string) => Promise<AuthenticateUserPresenter>;
}
