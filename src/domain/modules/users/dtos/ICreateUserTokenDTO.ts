import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ICreateUserTokenDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  expires_date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  refresh_token: string;
}
