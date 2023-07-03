import { UserModel } from '.';

export type UserAddressModel = {
  id: string;
  user_id: string;
  city: string;
  uf: string;
  latitude: number;
  longitude: number;
  user?: UserModel;
  created_at: Date;
  updated_at: Date;
};
