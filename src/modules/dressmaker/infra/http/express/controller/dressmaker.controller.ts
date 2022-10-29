import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ICreateDressmakerDTO } from '../../../../dtos/ICreateDressmakerDTO';
import { CreateDressmakerService } from '../../../services/prisma/create-dressmaker-service';

@Controller('dressmaker')
export class DressmakerController {
  constructor(private createDressmakerService: CreateDressmakerService) {}

  @ApiOkResponse({
    status: 201,
    description: 'The dressmaker has been created',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The dressmaker has not created, failed ',
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
}
