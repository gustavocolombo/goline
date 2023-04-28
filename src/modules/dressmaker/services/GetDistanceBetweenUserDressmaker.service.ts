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
        lat: findUser.address.find(
          (selectedAddress) => selectedAddress.current_address === true,
        ).lat,
        lng: findUser.address.find(
          (selectedAddress) => selectedAddress.current_address === true,
        ).lng,
      },
      {
        lat: dressmaker.address.find(
          (selectedAddress) => selectedAddress.current_address === true,
        ).lat,
        lng: dressmaker.address.find(
          (selectedAddress) => selectedAddress.current_address === true,
        ).lng,
      },
    );

    return {
      message: `A distância entre você e a(o) ${
        dressmaker.name
      } é de ${Math.floor(distance)} metros`,
    };
  }
}
