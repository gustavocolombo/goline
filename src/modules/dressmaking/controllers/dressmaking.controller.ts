import {
  BadRequestException,
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
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Dressmaking, RolesUser, Users } from '@prisma/client';
import { CreateDressmakingDTO } from '../dtos/CreateDressmakingDTO';
import { Roles } from '../../../shared/roles/users-roles';
import { CreateDressmakingService } from '../services/create-dressmaking-service';
import { GetDressmakingsByDressmakerService } from '../services/get-dressmakings-by-dresmaker-service';
import { GrabDressmakingService } from '../services/grab-dressmaking-service';
import { UserDecorator } from '../../../shared/decorator/user.decorator';
import { GetAllDressmakingDTO } from '../dtos/GetDressmakingsDTO';
import { GetAllDressmakingService } from '../services/get-all-dressmaking';
import { GetDressmakingService } from '../services/adapters/get-dressmaking.service';
import { GetAllDressmakingAdapter } from '../adapters/get-all-dressmaking.adapter';
import { GetOneDressmakingAdapter } from '../adapters/get-one-dressmaking.adapter';

@ApiTags('dressmaking')
@Controller('dressmaking')
export class DressmakingController {
  constructor(
    private createDressmakingService: CreateDressmakingService,
    private getDressmakingService: GetDressmakingsByDressmakerService,
    private grabDressmakingService: GrabDressmakingService,
    private getAllDressmakingService: GetAllDressmakingService,
    private getDressmakingWithAdaptersService: GetDressmakingService,
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
  async getDressmakings(@UserDecorator() user: Users) {
    return await this.getDressmakingService.execute({ id: user.id });
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
    @UserDecorator() user: Users,
    @Param('id') id: string,
  ): Promise<Dressmaking> {
    return await this.grabDressmakingService.execute({
      user_id: user.id,
      dressmaking_id: id,
    });
  }

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

  @ApiTags('Implements explicit Adapter design pattern - Structural pattern')
  @ApiOkResponse({
    description: 'Return one or a list of dressmakings in unique request',
    status: 200,
  })
  @ApiBadRequestResponse({
    description: 'Please type a id of dressmaking',
    status: 400,
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized to perform operation',
    status: 401,
  })
  @Get('/operation')
  async getDressmakingWithAdapter(
    @Query('type') type: string,
    @Query('id') id?: string,
  ): Promise<Dressmaking | Dressmaking[]> {
    if (type === 'all') {
      return this.getDressmakingWithAdaptersService.execute(
        new GetAllDressmakingAdapter(),
      );
    } else if (type !== 'all') {
      if (id) {
        const service = new GetOneDressmakingAdapter();
        return await service.getOne(id);
      }
      throw new BadRequestException(
        'Please make sure if id of dressmaking is defined',
      );
    }
  }
}
