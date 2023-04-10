import { Address, StatusAddress } from '@prisma/client';
import { CreateAddressDTO } from '../dtos/CreateAddressDTO';
import { HttpStatus } from '@nestjs/common';
import { UpdateAddressDTO } from '../dtos/UpdateAddressDTO';

export interface CrudAddressInterface {
  create(data: CreateAddressDTO): Promise<Address>;
  findOneAddress(address_id: string): Promise<Address>;
  findAllOfUser(user_id: string): Promise<Address[]>;
  updateAddress(data: UpdateAddressDTO): Promise<Address>;
  deleteAddress(address_id: string): Promise<{
    status: StatusAddress;
    httpStatus: HttpStatus;
    message: string;
  }>;
}
