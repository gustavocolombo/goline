import { HttpStatus, Injectable } from '@nestjs/common';
import { CrudAddressInterface } from '../implementations/crud-address.interface';
import { Address, StatusAddress } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { UpdateAddressDTO } from '../dtos/UpdateAddressDTO';
import { CreateAddressInterface } from '../interfaces/CreateAddress.interface';

@Injectable()
export class AddressRepository implements CrudAddressInterface {
  constructor(private prismaService: PrismaService) {}

  async create({
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
      let address: Address;

      const findCurrentAddress = await this.prismaService.address.findFirst({
        where: {
          users_id: user.id,
          AND: {
            current_address: true,
          },
        },
      });

      const changeCurrentAddress = await this.prismaService.users.update({
        where: { id: user.id },
        data: {
          address: {
            update: {
              data: {
                current_address: false,
              },
              where: {
                id: findCurrentAddress.id,
              },
            },
          },
        },
        include: { address: true },
      });

      if (
        changeCurrentAddress.address.map(
          (addressUser) => addressUser.current_address === false,
        )
      ) {
        address = await this.prismaService.address.create({
          data: {
            city,
            lat,
            lng,
            neighborhoud,
            number,
            street,
            zip_code,
            current_address: true,
          },
        });

        await this.prismaService.users.update({
          where: {
            id: user.id,
          },
          data: {
            address: {
              connect: {
                id: address.id,
              },
            },
          },
        });
      }

      return address;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findOneAddress(address_id: string): Promise<Address> {
    try {
      const address = await this.prismaService.address.findUnique({
        where: {
          id: address_id,
        },
      });

      return address;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findAllOfUser(user_id: string): Promise<Address[]> {
    try {
      const addressessOfUser = await this.prismaService.address.findMany({
        where: {
          users: {
            id: user_id,
          },
        },
      });

      return addressessOfUser;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async updateAddress({
    city,
    lat,
    lng,
    neighborhoud,
    number,
    street,
    zip_code,
    address_id,
    status,
    current_address,
  }: UpdateAddressDTO): Promise<Address> {
    try {
      const address = await this.prismaService.address.update({
        where: { id: address_id },
        data: {
          city,
          lat,
          lng,
          neighborhoud,
          number,
          street,
          zip_code,
          status,
          current_address,
        },
      });

      return address;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async deleteAddress(address_id: string): Promise<{
    status: StatusAddress;
    httpStatus: HttpStatus;
    message: string;
  }> {
    try {
      await this.prismaService.address.delete({
        where: { id: address_id },
      });

      return {
        status: StatusAddress.DELETED,
        httpStatus: HttpStatus.OK,
        message: 'Address deleted with success',
      };
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
