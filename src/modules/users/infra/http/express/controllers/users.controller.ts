import { Body, Controller, Post } from '@nestjs/common';
import { Users } from '@prisma/client';
import { ICreateUserDTO } from '../../../../dtos/ICreateUserDTO';
import { CreateUserService } from '../../../prisma/services/CreateUserService';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/users')
export class UsersController {
  constructor(private createUserService: CreateUserService) {}

  @ApiResponse({ status: 201, description: 'The user has been created' })
  @ApiResponse({ status: 400, description: 'The user has not created' })
  @Post()
  async createUser(
    @Body() { name, email, password }: ICreateUserDTO,
  ): Promise<Users> {
    return await this.createUserService.execute({ name, email, password });
  }
}
