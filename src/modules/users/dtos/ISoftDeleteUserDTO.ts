import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ISoftDeleteUserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
}
