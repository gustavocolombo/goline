import { BadRequestException, Injectable } from '@nestjs/common';
import { Dressmaker } from '@prisma/client';
import { hash } from 'bcryptjs';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { ICreateDressmakerDTO } from '../dtos/ICreateDressmakerDTO';

@Injectable()
export class CreateDressmakerService {
  constructor(private prismaService: PrismaService) {}

  async execute({
    name,
    email,
    password,
    cellphone,
    expertise,
    city,
    lat,
    lng,
    neighborhoud,
    number,
    street,
  }: ICreateDressmakerDTO): Promise<Dressmaker> {
    try {
      let dressmaker = await this.prismaService.dressmaker.findUnique({
        where: { email },
      });

      if (!dressmaker) {
        dressmaker = await this.prismaService.dressmaker.create({
          data: {
            name,
            email,
            password: await hash(password, 8),
            cellphone,
            expertise,
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
            address: {
              select: {
                city: true,
                neighborhoud: true,
                lat: true,
                lng: true,
                street: true,
                number: true,
              },
            },
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
