import { ApiProperty } from '@nestjs/swagger';
import { StatusUser } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class IGetDressmakingDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

interface IDataToReturnUserDTO {
  id: string;
  email: string;
  status: StatusUser;
}

export interface IReturnDressmakingDTO {
  id: string;
  name_service: string;
  grabbed: boolean;
  price: number;
  start_date: Date;
  end_date: Date;
  dressmaker: IDataToReturnUserDTO;
  user: IDataToReturnUserDTO;
}

export interface IGetAllDressmakingDTO {
  id: string;
  name_service: string;
  grabbed: boolean;
  price: number;
  start_date: Date;
  end_date: Date;
  dressmaker: IDataToReturnUserDTO;
}
