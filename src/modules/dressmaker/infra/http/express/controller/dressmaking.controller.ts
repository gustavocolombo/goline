import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { Dressmaking } from '@prisma/client';
import { ICreateDressmakingDTO } from '../../../../dtos/ICreateDressmakingDTO';
import { CreateDressmakingService } from '../../../prisma/services/create-dressmaking-service';

@Controller('dressmaking')
export class DressmakingController {
  constructor(private createDressmakingService: CreateDressmakingService) {}

  @ApiOkResponse({
    status: 201,
    description: 'The dressmaking has been create',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The dressmaking has not created, failed',
  })
  @Post('/:id')
  async createDressmaking(
    @Body()
    { name_service, price, start_date, end_date }: ICreateDressmakingDTO,
    @Param('id') id: string,
  ): Promise<Dressmaking> {
    // console.log('dressmaker_id', dressmaker_id);
    return await this.createDressmakingService.execute({
      name_service,
      price,
      start_date,
      end_date,
      dressmaker_id: id,
    });
  }
}
