import { BadRequestException, Injectable } from '@nestjs/common';
import { Dressmaking } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { IGrabDressmakingDTO } from '../dtos/IGrabDressmakingDTO';

@Injectable()
export class GrabDressmakingService {
  constructor(private prismaService: PrismaService) {}
  async execute({
    user_id,
    dressmaking_id,
  }: IGrabDressmakingDTO): Promise<Dressmaking> {
    try {
      const user = await this.prismaService.users.findFirst({
        where: { id: user_id },
      });

      const dressmaking = await this.prismaService.dressmaking.findFirst({
        where: { id: dressmaking_id },
      });

      if (!user) throw new BadRequestException('User not found');

      if (!dressmaking) throw new BadRequestException('Dressmaking not found');

      const grabbedDressmaking = await this.prismaService.dressmaking.update({
        where: { id: dressmaking.id },
        data: { grabbed: true, user_id: user.id },
      });

      return grabbedDressmaking;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
