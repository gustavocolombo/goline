import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SoftDeleteUserDTO {
  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;
}
