import { Injectable } from '@nestjs/common';
import { Dressmaker, StatusUser } from '@prisma/client';
import { hash } from 'bcryptjs';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { CreateDressmakerDTO } from '../dtos/CreateDressmakerDTO';
import { UpdateDressmakerDTO } from '../dtos/UpdateDressmakerDTO';
import { CrudDressmakerInterface } from '../implementations/dressmakers/crud.interface';

@Injectable()
export class DressmakerRepository implements CrudDressmakerInterface {
  constructor(private prismaService: PrismaService) {}

  async create({
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
  }: CreateDressmakerDTO): Promise<Dressmaker> {
    try {
      const dressmaker = await this.prismaService.dressmaker.create({
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

      return dressmaker;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findByEmail(email: string): Promise<Dressmaker | undefined> {
    try {
      const dressmaker = await this.prismaService.dressmaker.findUnique({
        where: { email },
      });

      return dressmaker || null;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async softDelete(dressmaker: Dressmaker): Promise<Dressmaker> {
    try {
      const updatedDressmaker = await this.prismaService.dressmaker.update({
        data: { status: StatusUser.INACTIVE },
        where: { id: dressmaker.id },
      });

      return updatedDressmaker || null;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async update(
    dressmaker: Dressmaker,
    dressmakerDTO: UpdateDressmakerDTO,
  ): Promise<Dressmaker> {
    try {
      const updatedDressmaker = await this.prismaService.dressmaker.update({
        where: { id: dressmaker.id },
        data: { ...dressmakerDTO },
      });

      return updatedDressmaker;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findOne(id: string): Promise<Dressmaker> {
    try {
      const dressmaker = await this.prismaService.dressmaker.findUnique({
        where: { id },
      });

      return dressmaker || null;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async delete(data: Dressmaker): Promise<Dressmaker> {
    try {
      const dressmaker = await this.prismaService.dressmaker.delete({
        where: { id: data.id },
      });

      return dressmaker;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findAll(): Promise<Dressmaker[]> {
    try {
      const dressmaker = await this.prismaService.dressmaker.findMany();

      return dressmaker;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
