import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { Address } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { UpdateAddressDTO } from '../dtos/UpdateAddressDTO';

@Injectable()
export class UpdateAddressService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(data: UpdateAddressDTO): Promise<Address> {
    try {
      const address = await this.addressRepository.findOneAddress(
        data.address_id,
      );

      if (!address) throw new NotFoundException('Address not found');

      const updatedAddress = await this.addressRepository.updateAddress(data);

      return updatedAddress;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
