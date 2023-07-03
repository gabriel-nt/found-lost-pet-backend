import { ResetPasswordDto } from './../dtos';

export interface ResetPasswordUseCase {
  execute: (data: ResetPasswordDto) => Promise<void>;
}
