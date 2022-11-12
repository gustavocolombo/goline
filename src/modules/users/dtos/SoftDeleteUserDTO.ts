import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SoftDeleteUserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
}
