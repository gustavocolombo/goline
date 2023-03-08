import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(12)
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('BR')
  cellphone?: string;

  @ApiProperty()
  @IsOptional()
  @IsLatitude()
  lat?: number;

  @ApiProperty()
  @IsLongitude()
  @IsOptional()
  lng?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  neighborhoud?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  number?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  zip_code?: string;
}
