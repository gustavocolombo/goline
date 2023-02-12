import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty()
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  users_id: string;

  @ApiProperty()
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  dressmaking_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  qtd_dressmakings: number;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  final_date_delivery?: Date;
}
