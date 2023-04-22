import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { DeleteAddressSerializer } from '../serializers/DeleteAddress.serializer';

@Injectable()
export class DeleteAddressService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(
    user_id: string,
    address_id: string,
  ): Promise<DeleteAddressSerializer> {
    try {
      let successDeletedAddress: DeleteAddressSerializer;

      const deletedAddress = await this.addressRepository.findOneAddress(
        address_id,
      );

      if (
        Array(await this.addressRepository.findAllOfUser(user_id)).length === 1
      ) {
        throw new BadRequestException('User can not stay without address');
      }

      if (!deletedAddress) throw new NotFoundException('Address not found');

      await this.addressRepository.deleteAddress(address_id);

      if (!(await this.addressRepository.findOneAddress(address_id))) {
        successDeletedAddress = {
          message: 'Address deleted with success',
          status: HttpStatus.OK,
          deletedAddress,
        };
      } else {
        throw new BadRequestException('Fail at delete address');
      }

      return successDeletedAddress;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
