import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AlterAddressActiveDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  address_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  old_address_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  user_id: string;
}
