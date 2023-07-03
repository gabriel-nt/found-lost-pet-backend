import { UserModel } from '../../users/models';
import { DisappearanceModel } from '../../disappearances/models';

export type CommentModel = {
  id: string;
  description: string;
  disappearance_id: string;
  disappearance?: DisappearanceModel;
  user_id: string;
  user?: UserModel;
  created_at: Date;
  updated_at: Date;
};
