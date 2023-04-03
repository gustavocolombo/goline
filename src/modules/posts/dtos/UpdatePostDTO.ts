import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UpdateDressmakingDTO } from '../../dressmaking/dtos/UpdateDressmakingDTO';

export class UpdatePostDTO {
  @ApiProperty()
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  post_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  dressmaking?: UpdateDressmakingDTO;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;
}
