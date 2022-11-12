import { ApiProperty } from '@nestjs/swagger';

class AuthenticateUser {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

export class IAuthenticateUserResponse {
  @ApiProperty()
  user: AuthenticateUser;

  @ApiProperty()
  token: string;

  @ApiProperty()
  refresh_token: string;
}
