import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Dressmaking } from '@prisma/client';
import { ICreateDressmakingDTO } from '../../../../dtos/ICreateDressmakingDTO';
import { CreateDressmakingService } from '../../../prisma/services/create-dressmaking-service';
import { Request } from 'express';
import { GetDressmakingsService } from '../../../prisma/services/get-dressmakings-service';

@Controller('dressmaking')
export class DressmakingController {
  constructor(
    private createDressmakingService: CreateDressmakingService,
    private getDressmakingService: GetDressmakingsService,
  ) {}

  @ApiOkResponse({
    status: 201,
    description: 'The dressmaking has been create',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The dressmaking has not created, failed',
  })
  @Post()
  async createDressmaking(
    @Body()
    { name_service, price, start_date, end_date }: ICreateDressmakingDTO,
    @Req() req: Request,
  ): Promise<Dressmaking> {
    return await this.createDressmakingService.execute({
      name_service,
      price,
      start_date,
      end_date,
      dressmaker_id: req.user.id,
    });
  }

  @ApiOkResponse({
    status: 201,
    description: 'The dressmaking has been loaded',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The dressmaking has not been loaded',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The dressmaking can not be loaded, fail authentication',
  })
  @Get()
  async getDressmakings(@Req() req: Request) {
    return await this.getDressmakingService.execute(req.user.id);
  }
}
