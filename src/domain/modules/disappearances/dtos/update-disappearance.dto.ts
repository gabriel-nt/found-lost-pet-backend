import { CreateDisappearanceDto } from './create-disappearance.dto';

export type UpdateDisappearanceDto = Partial<CreateDisappearanceDto> &
  Required<Pick<CreateDisappearanceDto, 'user_id'>>;
