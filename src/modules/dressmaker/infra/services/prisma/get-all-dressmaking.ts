import { Injectable } from '@nestjs/common';
import { StatusUser } from '@prisma/client';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { IGetAllDressmakingDTO } from '../../../dtos/IGetDressmakingsDTO';
import { GetAllDressmakingsImplementations } from '../../../implementations/dressmakings/get-all-dressmakings.implementation';

@Injectable()
export class GetAllDressmakingService
  implements GetAllDressmakingsImplementations
{
  constructor(private prismaService: PrismaService) {}

  async getAllDressmakings(
    skip?: number,
    take?: number,
  ): Promise<IGetAllDressmakingDTO[]> {
    const getDressmaking = await this.prismaService.dressmaking.findMany({
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

    return getDressmaking;
  }
}
