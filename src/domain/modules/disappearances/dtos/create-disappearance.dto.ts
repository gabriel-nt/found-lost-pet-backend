export type CreateDisappearanceDto = {
  name: string;
  description: string;
  situation: 'MISSING' | 'FOUND' | 'SIGHTED';
  type: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  email?: string;
  phone?: string;
  user_id: string;
  image: string;
};
