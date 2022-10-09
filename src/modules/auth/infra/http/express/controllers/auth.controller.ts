import { Body, Controller, Post } from '@nestjs/common';
import { IAuthFieldsRequiredDTO } from '../../../../dtos/IAuthFieldsRequiredDTO';
import { IResponseAuthDTO } from '../../../../dtos/IResponseAuthDTO';
import { AuthenticateUsersService } from '../../../prisma/services/AuthenticateUserService';

@Controller('/authenticate')
export class AuthController {
  constructor(private authenticateUserService: AuthenticateUsersService) {}

  @Post()
  async login(
    @Body() { email, password }: IAuthFieldsRequiredDTO,
  ): Promise<IResponseAuthDTO> {
    return await this.authenticateUserService.execute({ email, password });
  }
}
