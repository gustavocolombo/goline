import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { hash } from 'bcryptjs';
import ErrorHandling from '../../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { SendMailProducerService } from '../../jobs/bull/send-mail-producer.service';

@Injectable()
export class CreateUserService {
  constructor(
    private prismaService: PrismaService,
    private sendMailProducerService: SendMailProducerService,
  ) {}

  async execute({
    name,
    email,
    password,
    cellphone,
    height,
    weight,
    city,
    street,
    neighborhoud,
    number,
    lat,
    lng,
  }: ICreateUserDTO): Promise<Users> {
    try {
      let user = await this.prismaService.users.findUnique({
        where: { email },
      });

      if (user)
        throw new BadRequestException('User with e-mail already registered');

      if (!user) {
        user = await this.prismaService.users.create({
          data: {
            name,
            email,
            password: await hash(password, 8),
            cellphone,
            height,
            weight,
            address: {
              create: {
                city,
                street,
                neighborhoud,
                number,
                lat,
                lng,
              },
            },
          },
          include: {
            address: true,
          },
        });

        await this.sendMailProducerService.execute({ name, email });
      }

      delete user.password;

      return user;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
