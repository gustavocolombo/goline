import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('send-mail-queue') private queue: Queue) {}

  async execute({ email, name }: Partial<ICreateUserDTO>) {
    await this.queue.add('send-mail-job', { email, name });
  }
}
