import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GrabDressmakingDTO {
  @ApiProperty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsString()
  dressmaking_id: string;
}
