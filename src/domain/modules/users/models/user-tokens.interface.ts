import { UserModel } from '.';

export type UserTokensModel = {
  id: string;
  refresh_token: string;
  user_id: string;
  user?: UserModel;
  expires_date: Date;
  created_at: Date;
};
