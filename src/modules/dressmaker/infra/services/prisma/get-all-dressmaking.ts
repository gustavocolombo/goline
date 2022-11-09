import { Injectable } from '@nestjs/common';
import { StatusUser } from '@prisma/client';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { IGetDressmakingCronJobDTO } from '../../../dtos/IGetDressmakingsDTO';

@Injectable()
export class GetAllDressmakingService {
  constructor(private prismaService: PrismaService) {}

  async execute(): Promise<IGetDressmakingCronJobDTO[]> {
    const getDressmaking = await this.prismaService.dressmaking.findMany({
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

    return getDressmaking;
  }
}
