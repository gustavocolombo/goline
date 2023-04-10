import { Body, Controller, Post } from '@nestjs/common';
import { CreateAddressService } from '../services/CreateAddress.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Address, Users } from '@prisma/client';
import { CreateAddressDTO } from '../dtos/CreateAddressDTO';
import { UserDecorator } from '../../../shared/decorator/user.decorator';

@Controller('/address')
export class AddressController {
  constructor(private createAddressService: CreateAddressService) {}

  @ApiOperation({
    description: 'Request to create a new address to user alredy registered',
  })
  @ApiNotFoundResponse({ description: 'User not found', status: 401 })
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
}
