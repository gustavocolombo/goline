import { Controller, Get } from '@nestjs/common';

@Controller('status')
export class AppController {
  @Get()
  getHello() {
    return { message: 'Hello world' };
  }
}
