import { UserModel } from '../models';

export class AuthenticateUserPresenter {
  token: string;
  user: UserModel;
  refresh_token: string;
}
