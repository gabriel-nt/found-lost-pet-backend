export type ListDisappearancesParamsDto = {
  type?: string;
  limit?: number;
  user_id?: string;
  finalDate?: string;
  initialDate?: string;
  situation?: 'MISSING' | 'FOUND' | 'SIGHTED';
};
