import { Injectable } from '@nestjs/common';
import { Dressmaking } from '@prisma/client';
import ErrorHandling from '../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../shared/infra/prisma/prisma.service';

@Injectable()
export class GetAllDressmakingsService {
  constructor(private prismaService: PrismaService) {}

  async getAll(): Promise<Dressmaking[]> {
    try {
      const dressmakings = await this.prismaService.dressmaking.findMany();

      return dressmakings;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
