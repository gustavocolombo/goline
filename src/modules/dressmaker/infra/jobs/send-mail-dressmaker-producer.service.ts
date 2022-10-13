import { InjectQueue } from '@nestjs/bull';
import { Body, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { ICreateDressmakerDTO } from '../../dtos/ICreateDressmakerDTO';

@Injectable()
export class SendMailDressmakerProducerService {
  constructor(
    @InjectQueue('send-mail-queue-dressmaker') private queue: Queue,
  ) {}
  async execute(@Body() { name, email }: Partial<ICreateDressmakerDTO>) {
    await this.queue.add('send-mail-dressmaker-job', { name, email });
  }
}
