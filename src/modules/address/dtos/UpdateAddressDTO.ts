import { ApiProperty } from '@nestjs/swagger';
import { StatusAddress } from '@prisma/client';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAddressDTO {
  @ApiProperty()
  @IsUUID(4)
  @IsString()
  @IsNotEmpty()
  address_id: string;

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

  @ApiProperty()
  @IsString()
  @IsOptional()
  status?: StatusAddress;

  @ApiProperty()
  @IsString()
  @IsOptional()
  current_address?: boolean;
}
