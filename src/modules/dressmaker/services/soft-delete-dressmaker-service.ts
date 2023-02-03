import { Injectable } from '@nestjs/common';
import { Dressmaker, StatusUser } from '@prisma/client';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';

@Injectable()
export class SoftDeleteDressmakerService {
  constructor(private prismaService: PrismaService) {}

  async execute(dressmaker: Dressmaker): Promise<{ message: string }> {
    await this.prismaService.dressmaker.update({
      where: { id: dressmaker.id },
      data: { status: StatusUser.INACTIVE },
    });

    return {
      message: 'Dressmaker has been soft-deleted',
    };
  }
}
