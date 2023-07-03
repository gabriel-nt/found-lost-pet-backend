import { DisappearanceModel } from '../models';
import { CreateDisappearanceDto } from './../dtos';

export interface CreateDisappearanceUseCase {
  execute: (id: CreateDisappearanceDto) => Promise<DisappearanceModel>;
}
