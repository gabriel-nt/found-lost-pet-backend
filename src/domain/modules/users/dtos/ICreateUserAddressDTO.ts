import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class ICreateUserAddressDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  uf: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  longitude: number;

  @IsString()
  @IsOptional()
  user_id: string;
}
