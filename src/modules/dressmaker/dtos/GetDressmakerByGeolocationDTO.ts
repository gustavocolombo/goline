import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetDressmakerByGeolocation {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lat: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lng: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  radius: string;
}
