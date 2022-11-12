import { ApiProperty } from '@nestjs/swagger';

export class IRefreshTokenDTO {
  @ApiProperty()
  token: string;
}
