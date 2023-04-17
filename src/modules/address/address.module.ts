import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { AddressRepository } from './repositories/address.repository';
import { CreateAddressService } from './services/CreateAddress.service';
import { AddressController } from './controllers/address.controller';
import { AlterAddressActiveService } from './services/AlterAddressActive.service';
import { FindAllAddressesOfUser } from './services/FindAllAddressesOfUser.service';
import { FindOneAddressService } from './services/FindOneAddress.service';
import { DeleteAddressService } from './services/DeleteAddress.service';

@Module({
  providers: [
    PrismaService,
    UsersRepository,
    AddressRepository,
    CreateAddressService,
    AlterAddressActiveService,
    FindAllAddressesOfUser,
    FindOneAddressService,
    DeleteAddressService,
  ],
  controllers: [AddressController],
})
export class AddressModule {}
