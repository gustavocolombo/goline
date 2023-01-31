import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { insideCircle } from 'geolocation-utils';
import { StatusUser } from '@prisma/client';
import { IGetDressmakersByGeolocation } from '../../../dtos/IGetDressmakerByGeolocation';

@Injectable()
export class GetAllDressmakersInsideGeolocation {
  constructor(private prismaService: PrismaService) {}

  async execute({ lat, lng, radius, user_id }: IGetDressmakersByGeolocation) {
    const dressmakers = await this.prismaService.dressmaker.findMany({
      include: { address: true },
    });

    const user = await this.prismaService.users.findFirst({
      where: { id: user_id },
      include: { address: true },
    });

    if (!user) throw new NotFoundException('User not found');

    const center = { lat, lng };

    for (let i in dressmakers) {
      const teste = insideCircle(
        {
          lat: dressmakers[i].address[i].lat,
          lng: dressmakers[i].address[i].lng,
        },
        center,
        radius,
      );

      if (teste) {
        return await this.prismaService.dressmaker.findMany({
          where: {
            address: {
              some: {
                lat: dressmakers[i].address[i].lat,
                lng: dressmakers[i].address[i].lng,
              },
            },
            status: StatusUser.ACTIVE,
          },
          select: {
            id: true,
            email: true,
            cellphone: true,
            expertise: true,
            name: true,
            address: true,
          },
        });
      }
    }
  }
}
