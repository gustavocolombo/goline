import { Processor, Process } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';
import { ICreateUserDTO } from '../../../users/dtos/ICreateUserDTO';

@Processor('send-mail-queue-dressmaker')
export class SendMailConsumerDressmakerService {
  constructor(private mailerService: MailerService) {}

  @Process('send-mail-job-dressmaker')
  async sendMail(job: Job<Partial<ICreateUserDTO>>) {
    const { data } = job;

    return await this.mailerService.sendMail({
      from: 'barrett80@ethereal.email',
      to: data.email,
      date: new Date(),
      subject: `Welcome, ${data.name}!`,
      text: 'Welcome and enjoy the party!',
    });
  }
}
