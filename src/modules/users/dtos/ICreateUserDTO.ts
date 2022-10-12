import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsNumberString,
  IsPhoneNumber,
  IsLatitude,
  IsLongitude,
  IsNumber,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ICreateUserDTO {
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
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsPhoneNumber('BR')
  cellphone: string;

  @ApiProperty()
  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}
