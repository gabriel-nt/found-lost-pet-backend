export interface IListDisappearancesParams {
  situation?: 'MISSING' | 'FOUND' | 'SIGHTED';
  type?: string;
  initialDate?: string;
  finalDate?: string;
}
