import { HttpStatus } from '@nestjs/common';
import { Address } from '@prisma/client';

export interface AlterAddressActiveSerializer {
  message: string;
  status: HttpStatus;
  updatedAddress: Address;
}
