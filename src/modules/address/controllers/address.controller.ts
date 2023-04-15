import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateAddressService } from '../services/CreateAddress.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Address, Users } from '@prisma/client';
import { CreateAddressDTO } from '../dtos/CreateAddressDTO';
import { UserDecorator } from '../../../shared/decorator/user.decorator';
import { AlterAddressActiveDTO } from '../dtos/AlterAddressActiveDTO';
import { AlterAddressActiveSerializer } from '../serializers/AlterAddressActive.serializer';
import { AlterAddressActiveService } from '../services/AlterAddressActive.service';
import { FindAllAddressesOfUser } from '../services/FindAllAddressesOfUser.service';

@Controller('/address')
export class AddressController {
  constructor(
    private createAddressService: CreateAddressService,
    private alterAddressActiveService: AlterAddressActiveService,
    private getAllAddressesOfUserService: FindAllAddressesOfUser,
  ) {}

  @ApiOperation({
    description: 'Request to create a new address to user alredy registered',
  })
  @ApiNotFoundResponse({ description: 'User not found', status: 404 })
  @ApiUnauthorizedResponse({
    description: 'User not allowed to perform this operation',
    status: 401,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error, contact developers team',
    status: 500,
  })
  @Post()
  async createAddress(
    @Body()
    {
      city,
      lat,
      lng,
      neighborhoud,
      number,
      street,
      zip_code,
    }: CreateAddressDTO,
    @UserDecorator() user: Users,
  ): Promise<Address> {
    return this.createAddressService.execute({
      city,
      lat,
      lng,
      neighborhoud,
      number,
      street,
      zip_code,
      user,
    });
  }

  @ApiOperation({
    description: 'Request to update current address of user alredy registered',
  })
  @ApiNotFoundResponse({ description: 'Addresses not found', status: 404 })
  @ApiUnauthorizedResponse({
    description: 'User not allowed to perform this operation',
    status: 401,
  })
  @ApiBadRequestResponse({
    description: 'The address requsted to be the current is not active',
    status: 400,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error, contact developers team',
    status: 500,
  })
  @Patch()
  async updateCurrentAddress(
    @Body()
    { address_id, old_address_id }: Partial<AlterAddressActiveDTO>,
    @UserDecorator() user: Users,
  ): Promise<AlterAddressActiveSerializer> {
    return this.alterAddressActiveService.execute({
      address_id,
      old_address_id,
      user_id: user.id,
    });
  }

  @ApiOperation({
    description: 'Request to return all addresses of user alredy registered',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    status: 404,
  })
  @ApiUnauthorizedResponse({
    description: 'User not allowed to perform this operation',
    status: 401,
  })
  @ApiBadRequestResponse({
    description: 'No address related to user',
    status: 400,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error, contact developers team',
    status: 500,
  })
  @Get()
  async findAllAddressOfUser(@UserDecorator() user: Users): Promise<Address[]> {
    return this.getAllAddressesOfUserService.execute(user.id);
  }
}
