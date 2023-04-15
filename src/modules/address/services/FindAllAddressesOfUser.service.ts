import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { Address } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { UsersRepository } from '../../users/repositories/users.repository';

@Injectable()
export class FindAllAddressesOfUser {
  constructor(
    private addressRepository: AddressRepository,
    private userRepository: UsersRepository,
  ) {}

  async execute(user_id: string): Promise<Address[]> {
    try {
      const user = await this.userRepository.findOne(user_id);

      if (!user) throw new NotFoundException('User not found');

      const addresses = await this.addressRepository.findAllOfUser(user_id);

      if (Array(addresses).length === 0)
        throw new BadRequestException('No address related to user');

      return addresses;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
