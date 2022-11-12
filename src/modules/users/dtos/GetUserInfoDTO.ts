import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetUserInfoDTO {
  @ApiProperty()
  @IsString()
  user_id: string;
}
