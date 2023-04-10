import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAddressDTO {
  @ApiProperty()
  @IsUUID(4)
  @IsString()
  @IsOptional()
  address_id: string;

  @ApiProperty()
  @IsOptional()
  @IsLatitude()
  lat: number;

  @ApiProperty()
  @IsLongitude()
  @IsOptional()
  lng: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  street: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  neighborhoud: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  number: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  zip_code: string;
}
