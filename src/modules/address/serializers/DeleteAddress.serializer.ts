import { HttpStatus } from '@nestjs/common';
import { Address } from '@prisma/client';

export interface DeleteAddressSerializer {
  message: string;
  status: HttpStatus;
  deletedAddress: Address;
}
