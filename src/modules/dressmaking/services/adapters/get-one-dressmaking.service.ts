import { Injectable } from '@nestjs/common';
import { Dressmaking } from '@prisma/client';
import ErrorHandling from '../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../shared/infra/prisma/prisma.service';

@Injectable()
export class GetOneDressmakingsService {
  constructor(private prismaService: PrismaService) {}

  async getOne(id: string): Promise<Dressmaking> {
    try {
      const dressmaking = await this.prismaService.dressmaking.findUnique({
        where: { id },
      });

      return dressmaking;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
