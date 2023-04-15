import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { AlterAddressActiveDTO } from '../dtos/AlterAddressActiveDTO';
import { AlterAddressActiveSerializer } from '../serializers/AlterAddressActive.serializer';
import { StatusAddress } from '@prisma/client';

@Injectable()
export class AlterAddressActiveService {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    address_id,
    old_address_id,
    user_id,
  }: AlterAddressActiveDTO): Promise<AlterAddressActiveSerializer> {
    try {
      const addressOfUser = await this.addressRepository.findAllOfUser(user_id);

      if (!addressOfUser || Array(addressOfUser).length === 0)
        throw new NotFoundException('Addresses not found');

      if (
        !addressOfUser.find(
          (address) =>
            address.id !== address_id || address.id !== old_address_id,
        )
      ) {
        throw new NotFoundException(
          'Address not found, please provide valid id or create new address',
        );
      }

      if (
        addressOfUser.find(
          (address) =>
            address.id === address_id &&
            (address.status === StatusAddress.INACTIVE ||
              address.status === StatusAddress.DELETED),
        )
      ) {
        throw new BadRequestException(
          'The address requsted to be the current is not active',
        );
      }

      await this.addressRepository.updateAddress({
        address_id: old_address_id,
        current_address: false,
      });

      const updatedAddress = await this.addressRepository.updateAddress({
        address_id,
        current_address: true,
      });

      return {
        message: 'The current address was changed',
        status: HttpStatus.OK,
        updatedAddress,
      };
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
