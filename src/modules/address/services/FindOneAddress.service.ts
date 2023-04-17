import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { Address } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class FindOneAddressService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(address_id: string): Promise<Address> {
    try {
      const address = await this.addressRepository.findOneAddress(address_id);

      if (!address) throw new NotFoundException('Address not found');

      return address;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
