import { Address } from '@prisma/client';

export interface CrudAddressInterface {
  create(): Promise<Address>;
  findOneAddress(): Promise<Address>;
  findAllOfUser(): Promise<Address[]>;
  updateAddress(): Promise<Address>;
  deleteAddress(): Promise<Address>;
}
