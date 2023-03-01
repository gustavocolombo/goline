import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { PrecoPrazoResponse } from 'correios-brasil/dist';
import { CalculateShippingDTO } from '../dtos/CalculateShippingDTO';
import { DeliveryDateCalcService } from '../services/delivery-date-calc-service';
import { GetZipCodeByUserService } from '../services/get-zip-code-by-user-service';

@Controller('shipping')
export class ShippingController {
  constructor(
    private deliveryDateCalcService: DeliveryDateCalcService,
    private getZipCodeByUserService: GetZipCodeByUserService,
  ) {}

  @ApiResponse({
    description: 'Request to get price and date to delivery dressmakign',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Values from PAC and Sedex has been calculated successfully',
  })
  @ApiNotFoundResponse({
    status: 401,
    description: 'User or dressmaker id provided is not valid',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error, contact development team',
  })
  @Post()
  async calcShipping(
    @Body()
    {
      user_id,
      dressmaker_id,
      nCdFormato,
      nVlAltura,
      nVlComprimento,
      nVlDiametro,
      nVlLargura,
      nVlPeso,
    }: CalculateShippingDTO,
  ): Promise<PrecoPrazoResponse[]> {
    return await this.deliveryDateCalcService.execute({
      user_id,
      dressmaker_id,
      nCdFormato,
      nVlAltura,
      nVlComprimento,
      nVlDiametro,
      nVlLargura,
      nVlPeso,
    });
  }

  @ApiResponse({
    description: 'Request to get price and date to delivery dressmakign',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Values from PAC and Sedex has been calculated successfully',
  })
  @ApiNotFoundResponse({
    status: 401,
    description: 'User or dressmaker id provided is not valid',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error, contact development team',
  })
  @Get('/:user_id')
  async getZipCodeByUser(@Param('user_id') user_id: string): Promise<any> {
    return await this.getZipCodeByUserService.execute(user_id);
  }
}
