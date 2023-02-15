import { Injectable } from '@nestjs/common';
import { Dressmaking, StatusUser } from '@prisma/client';
import ErrorHandling from '../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../shared/infra/prisma/prisma.service';

@Injectable()
export class GetFirstDressmakingsService {
  constructor(private prismaService: PrismaService) {}

  async getOne(): Promise<Dressmaking> {
    try {
      const dressmaking = await this.prismaService.dressmaking.findFirst({
        where: {
          grabbed: false,
          dressmaker: {
            status: StatusUser.ACTIVE,
          },
        },
        orderBy: { created_at: 'desc' },
      });

      return dressmaking;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
