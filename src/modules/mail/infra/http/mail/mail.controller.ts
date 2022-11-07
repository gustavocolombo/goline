import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMailDTO } from '../../../dtos/send-mail.dto';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor() {}

  @Post()
  async teste(@Body() { email, name }: SendMailDTO) {}
}
