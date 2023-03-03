import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '@prisma/client';
import { distanceTo } from 'geolocation-utils';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';

@Injectable()
export class GetDistanceBetweenUserDressmakerService {
  constructor(private prismaService: PrismaService) {}

  async execute(user: Users, dressmaker_id: string): Promise<any> {
    const findUser = await this.prismaService.users.findUnique({
      where: { id: user.id },
      include: { address: true },
    });

    if (!findUser) throw new NotFoundException('User not found');

    const dressmaker = await this.prismaService.dressmaker.findUnique({
      where: { id: dressmaker_id },
      include: { address: true },
    });

    if (!dressmaker) throw new NotFoundException('User not found');

    const distance = distanceTo(
      {
        lat: findUser.address[0].lat,
        lng: findUser.address[0].lng,
      },
      {
        lat: dressmaker.address[0].lat,
        lng: dressmaker.address[0].lng,
      },
    );

    return {
      message: `A distância entre você e a(o) ${
        dressmaker.name
      } é de ${Math.floor(distance)} metros`,
    };
  }
}
