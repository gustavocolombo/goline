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
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Dressmaker, Users } from '@prisma/client';
import { UserDecorator } from '../../../shared/decorator/user.decorator';
import { GetDressmakerByGeolocation } from '../dtos/GetDressmakerByGeolocationDTO';
import { CreateDressmakerDTO } from '../dtos/CreateDressmakerDTO';
import { CreateDressmakerService } from '../services/CreateDressmaker.service';
import { GetAllDressmakersInsideGeolocationService } from '../services/GetAllDressmakersInsideGeolocation.service';
import { GetDistanceBetweenUserDressmakerService } from '../services/GetDistanceBetweenUserDressmaker.service';
import { GetDressmakerService } from '../services/GetDressmaker.service';
import { SoftDeleteDressmakerService } from '../services/SoftDeleteDressmaker.service';
import { UpdateDressmakerService } from '../services/UpdateDressmaker.service';
import { UpdateDressmakerDTO } from '../dtos/UpdateDressmakerDTO';

@ApiTags('dressmaker')
@Controller('dressmaker')
export class DressmakerController {
  constructor(
    private createDressmakerService: CreateDressmakerService,
    private getDressmakerService: GetDressmakerService,
    private updateDressmakerService: UpdateDressmakerService,
    private softDeleteDressmakerService: SoftDeleteDressmakerService,
    private getAllDressmakerInsideGeolocation: GetAllDressmakersInsideGeolocationService,
    private getDistanceBetweenUserDressmakerService: GetDistanceBetweenUserDressmakerService,
  ) {}

  @ApiBearerAuth()
  @Get('/get-by-geolocation/:user_id')
  async getDressmakerByGeolocation(
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
      zip_code,
    }: CreateDressmakerDTO,
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
      zip_code,
    });
  }

  @ApiBearerAuth()
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

  @ApiBearerAuth()
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
    @Body() dressmakerDTO: UpdateDressmakerDTO,
  ): Promise<Dressmaker> {
    return await this.updateDressmakerService.execute(
      dressmaker,
      dressmakerDTO,
    );
  }

  @ApiBearerAuth()
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
  ): Promise<Dressmaker> {
    return await this.softDeleteDressmakerService.execute(dressmaker);
  }

  @ApiBearerAuth()
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
