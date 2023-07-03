import { DisappearanceModel } from '../models';
import { CreateDisappearanceDto } from './../dtos';

export interface UpdateDisappearanceUseCase {
  execute: (
    id: string,
    data: CreateDisappearanceDto,
  ) => Promise<DisappearanceModel>;
}
