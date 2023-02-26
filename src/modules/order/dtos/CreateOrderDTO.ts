import { ApiProperty } from '@nestjs/swagger';
import { TagsDressmaking } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  tag?: TagsDressmaking;

  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  dressmaking_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  delivery_option?: string;
}
