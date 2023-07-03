import { AuthenticateUserPresenter } from './../presenters';
import { AuthenticateUserDto } from '../dtos';

export interface AuthenticateUserUseCase {
  execute: (data: AuthenticateUserDto) => Promise<AuthenticateUserPresenter>;
}
