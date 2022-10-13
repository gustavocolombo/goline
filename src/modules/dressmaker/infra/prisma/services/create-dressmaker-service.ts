import { BadRequestException, Injectable } from '@nestjs/common';
import { Dressmaker } from '@prisma/client';
import { hash } from 'bcryptjs';
import ErrorHandling from '../../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { ICreateDressmakerDTO } from '../../../dtos/ICreateDressmakerDTO';

@Injectable()
export class CreateDressmakerService {
  constructor(private prismaService: PrismaService) {}

  async execute({
    name,
    email,
    password,
    cellphone,
    expertise,
    lat,
    lng,
  }: ICreateDressmakerDTO): Promise<Dressmaker> {
    try {
      let dressmaker = await this.prismaService.dressmaker.findUnique({
        where: { email },
      });

      console.log('log no expertise', expertise);

      if (!dressmaker) {
        dressmaker = await this.prismaService.dressmaker.create({
          data: {
            name,
            email,
            password: await hash(password, 8),
            cellphone,
            lat,
            lng,
            expertise,
          },
        });
      } else {
        throw new BadRequestException('User with email already exists');
      }

      delete dressmaker.password;

      return dressmaker;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
