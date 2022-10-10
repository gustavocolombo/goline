import { Body, Controller, Post } from '@nestjs/common';
import { IAuthFieldsRequiredDTO } from '../../../../dtos/IAuthFieldsRequiredDTO';
import { IResponseAuthDTO } from '../../../../dtos/IResponseAuthDTO';
import { AuthenticateUsersService } from '../../../prisma/services/AuthenticateUserService';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/authenticate')
export class AuthController {
  constructor(private authenticateUserService: AuthenticateUsersService) {}

  @ApiResponse({ status: 201, description: 'The session has been created' })
  @ApiResponse({
    status: 401,
    description: 'The session has not created, credentials failed',
  })
  @Post()
  async login(
    @Body() { email, password }: IAuthFieldsRequiredDTO,
  ): Promise<IResponseAuthDTO> {
    return await this.authenticateUserService.execute({ email, password });
  }
}
