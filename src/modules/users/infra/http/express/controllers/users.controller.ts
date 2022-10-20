import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { Users } from '@prisma/client';
import { ICreateUserDTO } from '../../../../dtos/ICreateUserDTO';
import { CreateUserService } from '../../../prisma/services/CreateUserService';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IUpdateUserDTO } from '../../../../dtos/IUpdateUserDTO';
import { UpdateUserService } from '../../../prisma/services/update-user-service';
import { GetInfoUserService } from '../../../prisma/services/get-info-user-service';
import { Request } from 'express';

@Controller('/users')
export class UsersController {
  constructor(
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
    private getUserInfoService: GetInfoUserService,
  ) {}

  @ApiOkResponse({ status: 201, description: 'The user has been created' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The user has not created',
  })
  @Post()
  async createUser(
    @Body()
    {
      name,
      email,
      password,
      cellphone,
      height,
      weight,
      city,
      neighborhoud,
      number,
      street,
      lat,
      lng,
    }: ICreateUserDTO,
  ): Promise<Users> {
    return await this.createUserService.execute({
      name,
      email,
      password,
      cellphone,
      height,
      weight,
      lat,
      lng,
      city,
      neighborhoud,
      number,
      street,
    });
  }

  @ApiOkResponse({
    status: 200,
    description: 'The user has been loaded, success',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The user can not be loaded, failed',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The user has not been authorized',
  })
  @Get()
  async getUserInfo(@Req() req: Request): Promise<Users | undefined> {
    return await this.getUserInfoService.execute({ user_id: req.user.id });
  }

  @ApiOkResponse({
    status: 200,
    description: 'The user has been updated, success',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The user can not be update, failed',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The user has not been authorized',
  })
  @Put()
  async updateUser(@Body() { ...rest }: IUpdateUserDTO): Promise<any> {
    return await this.updateUserService.execute({ ...rest });
  }
}
