import { Injectable } from '@nestjs/common';
import { Dressmaker, Dressmaking, StatusUser } from '@prisma/client';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { CreateDressmakingDTO } from '../dtos/CreateDressmakingDTO';
import {
  GetAllDressmakingDTO,
  GetDressmakingDTO,
  ReturnDressmakingDTO,
} from '../dtos/GetDressmakingsDTO';
import { GrabDressmakingDTO } from '../dtos/GrabDressmakingDTO';
import { CrudDressmakingInterface } from '../implementations/crud.interface';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { UpdateDressmakingDTO } from '../dtos/UpdateDressmakingDTO';

@Injectable()
export class DressmakingsRepository
  implements CrudDressmakingInterface<Dressmaking>
{
  constructor(private prismaService: PrismaService) {}

  async create({
    name_service,
    price,
    start_date,
    end_date,
    dressmaker_id,
    grabbed,
    description,
    tag,
  }: CreateDressmakingDTO): Promise<Dressmaking> {
    try {
      const dressmaking = await this.prismaService.dressmaking.create({
        data: {
          name_service,
          price,
          start_date,
          end_date,
          dressmaker_id,
          grabbed,
          description,
          tag,
        },
        include: {
          dressmaker: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });

      return dressmaking;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findFirstToCreate(
    dressmaker_id: string,
  ): Promise<Dressmaker | undefined> {
    try {
      const dressmaker = await this.prismaService.dressmaker.findFirst({
        where: { AND: [{ id: dressmaker_id }, { status: StatusUser.ACTIVE }] },
      });

      return dressmaker || null;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async getDressmakingsByDressmaker({
    id,
  }: GetDressmakingDTO): Promise<ReturnDressmakingDTO[]> {
    try {
      const dressmakings = await this.prismaService.dressmaker.findFirst({
        where: { id },
        select: {
          dressmaking: {
            select: {
              id: true,
              name_service: true,
              grabbed: true,
              price: true,
              start_date: true,
              end_date: true,
              dressmaker: {
                select: {
                  id: true,
                  email: true,
                  status: true,
                },
              },
              user: {
                select: {
                  id: true,
                  email: true,
                  status: true,
                },
              },
            },
          },
        },
      });

      return dressmakings.dressmaking;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async grabDressmaking({
    dressmaking_id,
    user_id,
  }: GrabDressmakingDTO): Promise<Dressmaking> {
    try {
      const grabDressmaking = await this.prismaService.dressmaking.update({
        where: { id: dressmaking_id },
        data: { grabbed: true, user_id },
      });

      return grabDressmaking;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findFirst(dressmaking_id: string): Promise<Dressmaking | undefined> {
    try {
      const dressmaking = await this.prismaService.dressmaking.findFirst({
        where: { id: dressmaking_id },
      });

      return dressmaking || null;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async getAllDressmakings(
    skip?: number,
    take?: number,
  ): Promise<GetAllDressmakingDTO[]> {
    try {
      const dressmakings = await this.prismaService.dressmaking.findMany({
        skip,
        take,
        where: {
          grabbed: false,
          dressmaker: {
            status: StatusUser.ACTIVE,
          },
        },
        select: {
          id: true,
          name_service: true,
          grabbed: true,
          price: true,
          start_date: true,
          end_date: true,
          dressmaker: {
            select: {
              id: true,
              email: true,
              status: true,
            },
          },
        },
      });

      return dressmakings;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findById(id: string): Promise<Dressmaking> {
    try {
      const dressmaking = await this.prismaService.dressmaking.findUnique({
        where: { id },
      });

      return dressmaking;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async update(data: UpdateDressmakingDTO): Promise<Dressmaking> {
    try {
      const updatedDresmaking = await this.prismaService.dressmaking.update({
        where: { id: data.id },
        data: {
          ...data,
        },
      });

      return updatedDresmaking;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
