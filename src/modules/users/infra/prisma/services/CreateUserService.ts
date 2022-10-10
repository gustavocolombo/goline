import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { hash } from 'bcryptjs';
import ErrorHandling from '../../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { SendMailProducerService } from '../../jobs/bull/send-mail-producer.service';

@Injectable()
export class CreateUserService {
  constructor(
    private prismaService: PrismaService,
    private sendMailProducerService: SendMailProducerService,
    private readonly logger: Logger,
  ) {}

  async execute({
    name,
    email,
    password,
  }: Prisma.UsersCreateInput): Promise<Users> {
    try {
      let user = await this.prismaService.users.findUnique({
        where: { email },
      });

      if (user) throw new BadRequestException('User already exists');

      if (!user) {
        user = await this.prismaService.users.create({
          data: {
            name,
            email,
            password: await hash(password, 8),
          },
        });

        await this.sendMailProducerService.execute({ name, email });
      }

      delete user.password;

      return user;
    } catch (err) {
      this.logger.error(err);
      throw new ErrorHandling(err);
    }
  }
}
