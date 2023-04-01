import { ApiProperty } from '@nestjs/swagger';
import { Dressmaking } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostDTO {
  @ApiProperty()
  @IsNotEmpty()
  dressmaking: Dressmaking;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID(4)
  dressmaker_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;
}
