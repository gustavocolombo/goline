import { Injectable } from '@nestjs/common';
import { CrudAddressInterface } from '../implementations/crud-address.interface';
import { Address } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class AddressRepository implements CrudAddressInterface {
  create(): Promise<Address> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
  findOneAddress(): Promise<Address> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
  findAllOfUser(): Promise<Address[]> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
  updateAddress(): Promise<Address> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
  deleteAddress(): Promise<Address> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
