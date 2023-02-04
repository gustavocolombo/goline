import { ApiProperty } from '@nestjs/swagger';
import { StatusUser } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetDressmakingDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

interface DataToReturnUserDTO {
  id: string;
  email: string;
  status: StatusUser;
}

export interface ReturnDressmakingDTO {
  id: string;
  name_service: string;
  grabbed: boolean;
  price: number;
  start_date: Date;
  end_date: Date;
  dressmaker: DataToReturnUserDTO;
  user: DataToReturnUserDTO;
}

export interface GetAllDressmakingDTO {
  id: string;
  name_service: string;
  grabbed: boolean;
  price: number;
  start_date: Date;
  end_date: Date;
  dressmaker: DataToReturnUserDTO;
}
