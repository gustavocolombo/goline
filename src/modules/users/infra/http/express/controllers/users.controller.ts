import { Body, Controller, Post, Put } from '@nestjs/common';
import { Users } from '@prisma/client';
import { ICreateUserDTO } from '../../../../dtos/ICreateUserDTO';
import { CreateUserService } from '../../../prisma/services/CreateUserService';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { IUpdateUserDTO } from '../../../../dtos/IUpdateUserDTO';
import { UpdateUserService } from '../../../prisma/services/update-user-service';

@Controller('/users')
export class UsersController {
  constructor(
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
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

  @Put()
  async updateUser(@Body() { ...rest }: IUpdateUserDTO): Promise<any> {
    return await this.updateUserService.execute({ ...rest });
  }
}
