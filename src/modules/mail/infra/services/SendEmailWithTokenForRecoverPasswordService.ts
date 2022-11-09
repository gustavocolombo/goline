import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import ISendEmailWithTokenDTO from '../../dtos/ISendEmailWithTokenDTO';

@Injectable()
class SendEmailWithTokenForRecoverPasswordService {
  constructor(private mailer: MailerService) {}

  async execute({ user, token }: ISendEmailWithTokenDTO): Promise<void> {
    await this.mailer
      .sendMail({
        to: user.email,
        from:
          'No reply this email please' + process.env.SMTP_AUTH_USER_ETHEREAL,
        subject: 'Token for recover password',
        template: 'sendToken',
        context: {
          name: user.name,
          token: token,
        },
      })
      .catch((error) => {
        console.log('ERROR SEND EMAIL WITH TOKEN: ' + error);
      });
  }
}

export default SendEmailWithTokenForRecoverPasswordService;
