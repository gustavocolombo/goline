import { Injectable } from '@nestjs/common';
import { Dressmaking } from '@prisma/client';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';

@Injectable()
export class GetDressmakingsService {
  constructor(private prismaService: PrismaService) {}

  async execute(id: string): Promise<Dressmaking[]> {
    const dressmakings = await this.prismaService.dressmaker.findFirst({
      where: { id },
      select: {
        dressmaking: true,
      },
    });

    return dressmakings ? dressmakings.dressmaking : [];
  }
}
