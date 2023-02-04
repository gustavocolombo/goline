import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateDressmakerDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(12)
  password?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  expertise?: string[];

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
  image_profile?: string;
}
