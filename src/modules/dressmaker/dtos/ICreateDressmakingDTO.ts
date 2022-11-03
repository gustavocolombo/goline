import { ApiProperty } from '@nestjs/swagger';
import { TagsDressmaking } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ICreateDressmakingDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name_service: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  grabbed?: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tag?: TagsDressmaking;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @ApiProperty()
  dressmaker_id: string;
}
