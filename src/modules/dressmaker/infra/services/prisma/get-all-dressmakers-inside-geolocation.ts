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

    const center = {
      lat: user.address[0].lat,
      lng: user.address[0].lng,
    } ?? { lat, lng };

    let arrayOfDressmakersInsideRadius = [];

    await Promise.all(
      dressmakers.map(async (dressmaker) => {
        const isInsideCircle = insideCircle(
          {
            lat: dressmaker.address[0].lat,
            lng: dressmaker.address[0].lng,
          },
          center,
          radius,
        );

        if (isInsideCircle === true) {
          const dressmakers = await this.prismaService.dressmaker.findMany({
            where: {
              address: {
                every: {
                  lat: dressmaker.address[0].lat,
                  lng: dressmaker.address[0].lng,
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
          arrayOfDressmakersInsideRadius.push(dressmakers);
        }
      }),
    );

    return arrayOfDressmakersInsideRadius;
  }
}
