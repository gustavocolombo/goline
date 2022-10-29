import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Dressmaking, RolesUser } from '@prisma/client';
import { ICreateDressmakingDTO } from '../../../../dtos/ICreateDressmakingDTO';
import { Request } from 'express';
import { Roles } from '../../../../../../shared/roles/users-roles';
import { CreateDressmakingService } from '../../../services/prisma/create-dressmaking-service';
import { GetDressmakingsService } from '../../../services/prisma/get-dressmakings-service';
import { GrabDressmakingService } from '../../../services/prisma/grab-dressmaking-service';

@Controller('dressmaking')
export class DressmakingController {
  constructor(
    private createDressmakingService: CreateDressmakingService,
    private getDressmakingService: GetDressmakingsService,
    private grabDressmakingService: GrabDressmakingService,
  ) {}

  @ApiOkResponse({
    status: 201,
    description: 'The dressmaking has been create',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The dressmaking has not created, failed',
  })
  @Roles(RolesUser.DRESSMAKER)
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
  @Roles(RolesUser.DRESSMAKER, RolesUser.DRESSMAKER)
  @Get()
  async getDressmakings(@Req() req: Request) {
    return await this.getDressmakingService.execute(req.user.id);
  }

  @ApiOkResponse({
    status: 200,
    description: 'The dressmaking has been updated',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The dressmaking can not updated',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'You are not authorized to update this dressmaking',
  })
  @Roles(RolesUser.DRESSMAKER)
  @Patch('/:id')
  async updateDressmaking(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Dressmaking> {
    return await this.grabDressmakingService.execute({
      user_id: req.user.id,
      dressmaking_id: id,
    });
  }
}
