import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ICreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
