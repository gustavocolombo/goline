import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Dressmaker } from '@prisma/client';
import { UserDecorator } from '../../../../../../shared/decorator/user.decorator';
import { ICreateDressmakerDTO } from '../../../../dtos/ICreateDressmakerDTO';
import { CreateDressmakerService } from '../../../services/prisma/create-dressmaker-service';
import { GetDressmakerService } from '../../../services/prisma/get-dressmaker-service';
import { SoftDeleteDressmakerService } from '../../../services/prisma/soft-delete-dressmaker-service';
import { UpdateDressmakerService } from '../../../services/prisma/update-dressmaker-service';

@ApiTags('dressmaker')
@Controller('dressmaker')
export class DressmakerController {
  constructor(
    private createDressmakerService: CreateDressmakerService,
    private getDressmakerService: GetDressmakerService,
    private updateDressmakerService: UpdateDressmakerService,
    private softDeleteDressmakerService: SoftDeleteDressmakerService,
  ) {}

  @ApiOkResponse({
    status: 201,
    description: 'The dressmaker has been created',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The dressmaker has not created, failed ',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'You are not allowed to finish this request',
  })
  @Post()
  async createDressmaker(
    @Body()
    {
      name,
      email,
      password,
      cellphone,
      lat,
      lng,
      expertise,
      city,
      neighborhoud,
      number,
      street,
    }: ICreateDressmakerDTO,
  ) {
    return await this.createDressmakerService.execute({
      name,
      email,
      password,
      cellphone,
      lat,
      lng,
      expertise,
      city,
      neighborhoud,
      number,
      street,
    });
  }

  @ApiOkResponse({
    status: 201,
    description: 'The dressmaker has been researched with success',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The dressmaker has been researched with failure',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'You are not allowed to finish this request',
  })
  @Get()
  async getUser(@UserDecorator() dressmaker: Dressmaker): Promise<Dressmaker> {
    return await this.getDressmakerService.execute(dressmaker);
  }

  @ApiOkResponse({
    status: 201,
    description: 'The dressmaker has been updated',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The dressmaker has not updated, failed ',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'You are not allowed to finish this request',
  })
  @Put()
  async updateUser(
    @UserDecorator() dressmaker: Dressmaker,
    @Body() { ...rest }: Dressmaker,
  ): Promise<Dressmaker> {
    return await this.updateDressmakerService.execute(dressmaker.id, {
      ...rest,
    });
  }

  @ApiOkResponse({
    status: 201,
    description: 'The dressmaker has been inactivated',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The dressmaker has not inactivated, failed ',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'You are not allowed to finish this request',
  })
  @Patch()
  async softDelete(
    @UserDecorator() dressmaker: Dressmaker,
  ): Promise<{ message: string }> {
    return await this.softDeleteDressmakerService.execute(dressmaker);
  }
}
