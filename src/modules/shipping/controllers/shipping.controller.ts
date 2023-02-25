import { Body, Controller, Post } from '@nestjs/common';
import { CalculateShippingDTO } from '../dtos/CalculateShippingDTO';
import { DeliveryDateCalcService } from '../services/delivery-date-calc-service';

@Controller('shipping')
export class ShippingController {
  constructor(private deliveryDateCalcService: DeliveryDateCalcService) {}

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
  ) {
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
}
