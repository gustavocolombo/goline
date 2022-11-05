import { Body, Controller, Get, Patch, Post, Put, Req } from '@nestjs/common';
import { RolesUser, Users } from '@prisma/client';
import { ICreateUserDTO } from '../../../../dtos/ICreateUserDTO';
import { CreateUserService } from '../../../prisma/services/CreateUserService';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IUpdateUserDTO } from '../../../../dtos/IUpdateUserDTO';
import { UpdateUserService } from '../../../prisma/services/update-user-service';
import { GetInfoUserService } from '../../../prisma/services/get-info-user-service';
import { Request } from 'express';
import { SoftDeleteUserService } from '../../../prisma/services/soft-delete-user-service';
import { ISoftDeleteUserDTO } from '../../../../dtos/ISoftDeleteUserDTO';
import { IResetPasswordDTO } from '../../../../dtos/IResetPasswordDTO';
import { ResetPasswordService } from '../../../prisma/services/reset-password-service';
import { Roles } from '../../../../../../shared/roles/users-roles';
import { UserDecorator } from '../../../../../../shared/decorator/user.decorator';

@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
    private getUserInfoService: GetInfoUserService,
    private softDeleteUserService: SoftDeleteUserService,
    private resetPasswordService: ResetPasswordService,
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
  @Roles(RolesUser.USER)
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
  @Roles(RolesUser.USER)
  @Put()
  async updateUser(@Body() { ...rest }: IUpdateUserDTO): Promise<any> {
    return await this.updateUserService.execute({ ...rest });
  }

  @ApiOkResponse({
    status: 200,
    description: 'The user has been inactivated, success',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The user can not be inactivated, failed',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The user has not been authorized',
  })
  @Roles(RolesUser.USER)
  @Patch()
  async softDeleteUser(@Body() { email }: ISoftDeleteUserDTO): Promise<any> {
    return await this.softDeleteUserService.execute({ email });
  }

  @ApiOkResponse({
    status: 200,
    description: 'The user can be reset your password, success',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The user can not be reset password, failed',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The user has not been authorized',
  })
  @Roles(RolesUser.USER)
  @Patch('/reset-password')
  async resetPassword(
    @Body() { email, new_password }: IResetPasswordDTO,
  ): Promise<Users> {
    return await this.resetPasswordService.execute({ email, new_password });
  }

  @Get('/teste')
  async teste(@UserDecorator() user: Users) {
    console.log('user', user);
  }
}
