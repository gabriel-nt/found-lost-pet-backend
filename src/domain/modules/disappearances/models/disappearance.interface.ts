import { UserModel } from '../../users/models';

export type DisappearanceModel = {
  id: string;
  name: string;
  description: string;
  situation: 'MISSING' | 'FOUND' | 'SIGHTED';
  type: string;
  image: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  city: string;
  uf: string;
  user_id: string;
  user?: UserModel;
  created_at: Date;
  updated_at: Date;
};
