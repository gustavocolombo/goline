import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class IGetDressmakingDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
