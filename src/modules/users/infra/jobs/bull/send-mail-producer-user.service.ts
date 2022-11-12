import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateUserDTO } from '../../../dtos/CreateUserDTO';

@Injectable()
export class SendMailProducerUserService {
  constructor(@InjectQueue('send-mail-queue-user') private queue: Queue) {}

  async execute({ email, name }: Partial<CreateUserDTO>) {
    await this.queue.add('send-mail-job-user', { email, name });
  }
}
