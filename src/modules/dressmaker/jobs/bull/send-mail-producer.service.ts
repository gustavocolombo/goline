import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ICreateUserDTO } from '../../../users/dtos/ICreateUserDTO';

@Injectable()
export class SendMailProducerDressmakerService {
  constructor(
    @InjectQueue('send-mail-queue-dressmaker') private queue: Queue,
  ) {}

  async execute({ email, name }: Partial<ICreateUserDTO>) {
    await this.queue.add('send-mail-job-dressmaker', { email, name });
  }
}
