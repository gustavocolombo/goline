import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateUserDTO } from '../../../users/dtos/CreateUserDTO';

@Injectable()
export class SendMailProducerDressmakerService {
  constructor(
    @InjectQueue('send-mail-queue-dressmaker') private queue: Queue,
  ) {}

  async execute({ email, name }: Partial<CreateUserDTO>) {
    await this.queue.add('send-mail-job-dressmaker', { email, name });
  }
}
