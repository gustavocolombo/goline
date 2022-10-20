import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IGetUserInfoDTO {
  @ApiProperty()
  @IsString()
  user_id: string;
}
