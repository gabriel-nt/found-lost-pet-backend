import { DisappearanceModel } from '../models';
import { ListDisappearancesParamsDto } from '../dtos';

export interface ListDisappearancesUseCase {
  execute: (
    params: ListDisappearancesParamsDto,
  ) => Promise<DisappearanceModel[]>;
}
