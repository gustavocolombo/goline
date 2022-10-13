import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ICreateDressmakerDTO } from '../../dtos/ICreateDressmakerDTO';

@Processor('send-mail-queue-dressmaker')
export class SendMailDressmakerConsumerService {
  constructor(private mailerService: MailerService) {}

  @Process('send-mail-dressmaker-job')
  async sendMailDressmaker(job: Job<Partial<ICreateDressmakerDTO>>) {
    const { data } = job;

    return await this.mailerService.sendMail({
      to: data.email,
      from: 'no-reply@goline.com',
      subject: 'Welcome!',
      date: new Date(),
      text: `Welcome to GoLine, ${data.name}`,
    });
  }
}
