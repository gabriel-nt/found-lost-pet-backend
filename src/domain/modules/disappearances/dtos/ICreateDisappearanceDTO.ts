import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ICreateDisappearanceDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  situation: 'MISSING' | 'FOUND' | 'SIGHTED';

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  uf: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone?: string;

  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
