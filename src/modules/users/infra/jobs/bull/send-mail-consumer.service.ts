import { Processor, Process } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';

@Processor('send-mail-queue')
export class SendMailConsumerService {
  constructor(private mailerService: MailerService) {}

  @Process('send-mail-job')
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
