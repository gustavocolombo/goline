import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Dressmaking, RolesUser, Users } from '@prisma/client';
import { CreateDressmakingDTO } from '../dtos/CreateDressmakingDTO';
import { Roles } from '../../../shared/roles/users-roles';
import { CreateDressmakingService } from '../services/CreateDressmaking.service';
import { GetDressmakingsByDressmakerService } from '../services/GetDressmakingByDressmaker.service';
import { GrabDressmakingService } from '../services/GrabDressmaking.service';
import { UserDecorator } from '../../../shared/decorator/user.decorator';
import { GetAllDressmakingDTO } from '../dtos/GetDressmakingsDTO';
import { GetAllDressmakingService } from '../services/GetAllDressmaking.service';

@ApiTags('dressmaking')
@Controller('dressmaking')
export class DressmakingController {
  constructor(
    private createDressmakingService: CreateDressmakingService,
    private getDressmakingService: GetDressmakingsByDressmakerService,
    private grabDressmakingService: GrabDressmakingService,
    private getAllDressmakingService: GetAllDressmakingService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ deprecated: true })
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
    {
      name_service,
      price,
      description,
      tag,
      start_date,
      end_date,
    }: CreateDressmakingDTO,
    @UserDecorator() user: Users,
  ): Promise<Dressmaking> {
    return await this.createDressmakingService.execute({
      name_service,
      price,
      description,
      tag,
      start_date,
      end_date,
      dressmaker_id: user.id,
    });
  }

  @ApiBearerAuth()
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
  @Roles(RolesUser.USER, RolesUser.DRESSMAKER)
  @Get()
  async getDressmakings(@UserDecorator() user: Users) {
    return await this.getDressmakingService.execute({ id: user.id });
  }

  @ApiBearerAuth()
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
    @UserDecorator() user: Users,
    @Param('id') id: string,
  ): Promise<Dressmaking> {
    return await this.grabDressmakingService.execute({
      user_id: user.id,
      dressmaking_id: id,
    });
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'A new dressmaking has been added',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'A new dressmaking cannot be added, fail',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'You are not authorized to view this list',
  })
  @Roles(RolesUser.USER, RolesUser.DRESSMAKER)
  @Get('/global')
  async getDressmakingCronJob(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take = 10,
  ): Promise<GetAllDressmakingDTO[]> {
    return await this.getAllDressmakingService.getAllDressmakings(skip, take);
  }
}
