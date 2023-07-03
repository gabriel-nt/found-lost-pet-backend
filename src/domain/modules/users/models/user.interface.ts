import { UserAddressModel } from '.';

export type UserModel = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  address?: UserAddressModel;
  created_at: Date;
};
