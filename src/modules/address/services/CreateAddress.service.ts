import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { Address } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { UsersRepository } from '../../users/repositories/users.repository';
import { CreateAddressInterface } from '../interfaces/CreateAddress.interface';

@Injectable()
export class CreateAddressService {
  constructor(
    private addressRepository: AddressRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    city,
    lat,
    lng,
    neighborhoud,
    number,
    street,
    zip_code,
    user,
  }: CreateAddressInterface): Promise<Address> {
    try {
      const findUser = await this.usersRepository.findOne(user.id);

      if (!findUser) throw new NotFoundException('User not found');

      const address = await this.addressRepository.create({
        city,
        lat,
        lng,
        neighborhoud,
        number,
        street,
        zip_code,
        user: findUser,
      });

      return address;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
