import { DisappearanceModel } from '../models';

export interface GetDisappearanceUseCase {
  execute: (id: string) => Promise<DisappearanceModel>;
}
