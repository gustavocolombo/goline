import { Body, Controller, Post } from '@nestjs/common';
import { IAuthFieldsRequiredDTO } from '../../../../dtos/IAuthFieldsRequiredDTO';
import { IResponseAuthDTO } from '../../../../dtos/IResponseAuthDTO';
import { AuthenticateUsersService } from '../../../prisma/services/AuthenticateUserService';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Dressmaker, Users } from '@prisma/client';

@Controller('/authenticate')
export class AuthController {
  constructor(private authenticateUserService: AuthenticateUsersService) {}

  @ApiOkResponse({ status: 201, description: 'The session has been created' })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The session has not created, credentials failed',
  })
  @Post()
  async login(
    @Body() { email, password }: IAuthFieldsRequiredDTO,
  ): Promise<IResponseAuthDTO<Users | Dressmaker>> {
    return await this.authenticateUserService.execute({ email, password });
  }
}
