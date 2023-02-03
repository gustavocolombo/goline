import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Dressmaker, Users } from '@prisma/client';
import { UserDecorator } from '../../../shared/decorator/user.decorator';
import { GetDressmakerByGeolocation } from '../dtos/GetDressmakerByGeolocationDTO';
import { ICreateDressmakerDTO } from '../dtos/ICreateDressmakerDTO';
import { CreateDressmakerService } from '../services/create-dressmaker-service';
import { GetAllDressmakersInsideGeolocation } from '../services/get-all-dressmakers-inside-geolocation';
import { GetDistanceBetweenUserDressmakerService } from '../services/get-distance-between-user-dressmaker-service';
import { GetDressmakerService } from '../services/get-dressmaker-service';
import { SoftDeleteDressmakerService } from '../services/soft-delete-dressmaker-service';
import { UpdateDressmakerService } from '../services/update-dressmaker-service';

@ApiTags('dressmaker')
@Controller('dressmaker')
export class DressmakerController {
  constructor(
    private createDressmakerService: CreateDressmakerService,
    private getDressmakerService: GetDressmakerService,
    private updateDressmakerService: UpdateDressmakerService,
    private softDeleteDressmakerService: SoftDeleteDressmakerService,
    private getAllDressmakerInsideGeolocation: GetAllDressmakersInsideGeolocation,
    private getDistanceBetweenUserDressmakerService: GetDistanceBetweenUserDressmakerService,
  ) {}

  @Get('/get-by-geolocation/:user_id')
  async teste(
    @Param('user_id') user_id: string,
    @Query() query: GetDressmakerByGeolocation,
  ) {
    return await this.getAllDressmakerInsideGeolocation.execute({
      lat: parseFloat(query.lat),
      lng: parseFloat(query.lng),
      radius: parseFloat(query.radius),
      user_id,
    });
  }

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

  @Get('/:dressmaker_id')
  async getDistanceBetweenUserDressmaker(
    @Param('dressmaker_id') dressmaker_id: string,
    @UserDecorator() user: Users,
  ): Promise<string> {
    return await this.getDistanceBetweenUserDressmakerService.execute(
      user,
      dressmaker_id,
    );
  }
}
