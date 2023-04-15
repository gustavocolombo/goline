import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { AddressRepository } from './repositories/address.repository';
import { CreateAddressService } from './services/CreateAddress.service';
import { AddressController } from './controllers/address.controller';
import { AlterAddressActiveService } from './services/AlterAddressActive.service';

@Module({
  providers: [
    PrismaService,
    UsersRepository,
    AddressRepository,
    CreateAddressService,
    AlterAddressActiveService,
  ],
  controllers: [AddressController],
})
export class AddressModule {}
