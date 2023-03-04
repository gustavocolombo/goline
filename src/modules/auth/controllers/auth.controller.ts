import { Body, Controller, Post } from '@nestjs/common';
import { IAuthFieldsRequiredDTO } from '../dtos/IAuthFieldsRequiredDTO';
import { IResponseAuthDTO } from '../dtos/IResponseAuthDTO';
import { AuthenticateUsersService } from '../services/AuthenticateUser.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Dressmaker, Users } from '@prisma/client';
import RedefinePasswordDTO from '../dtos/RedefinePasswordDTO';
import RedefinePasswordService from '../services/RedefinePassword.service';
import { SendMailWithTokenService } from '../services/SendMailWithToken.service';
import SendEmailWithTokenDTO from '../dtos/SendEmailWithTokenDTO';

@ApiTags('authenticate')
@Controller('/authenticate')
export class AuthController {
  constructor(
    private authenticateUserService: AuthenticateUsersService,
    private sendMailWithTokenService: SendMailWithTokenService,
    private redefinePasswordService: RedefinePasswordService,
  ) {}

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

  @ApiOkResponse({
    status: 201,
    description: 'The e-mail with token has been sended',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The e-mail cannot be sended',
  })
  @Post('send-mail')
  async sendEmailWithToken(@Body() { email }: SendEmailWithTokenDTO) {
    return await this.sendMailWithTokenService.execute({ email });
  }

  @ApiOkResponse({
    status: 201,
    description: 'The password has been changed',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The password cannot be changed',
  })
  @Post('redefine-password')
  async redefinePassword(
    @Body() { token, password, confirmPassword }: RedefinePasswordDTO,
  ) {
    return await this.redefinePasswordService.execute({
      token,
      password,
      confirmPassword,
    });
  }
}
