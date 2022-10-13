import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsPhoneNumber,
  IsLatitude,
  IsLongitude,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ICreateDressmakerDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(12)
  password: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  expertise: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  cellphone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @ApiProperty()
  @IsLongitude()
  @IsNotEmpty()
  lng: number;
}
