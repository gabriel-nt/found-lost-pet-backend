import { ApiProperty } from '@nestjs/swagger';
import { User } from '../infra/typeorm/entities/user.entity';

export class IAuthenticateUserResponse {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;

  @ApiProperty()
  refresh_token: string;
}
