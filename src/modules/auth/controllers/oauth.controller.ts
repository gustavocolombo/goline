import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { OAuthService } from '../services/OAuth.service';

@ApiTags('oauth')
@Controller('google')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.oauthService.googleLogin(req);
  }
}
