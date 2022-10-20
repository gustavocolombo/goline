import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IGrabDressmakingDTO {
  @ApiProperty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsString()
  dressmaking_id: string;
}
