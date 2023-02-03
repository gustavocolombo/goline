import { Injectable } from '@nestjs/common';
import { Dressmaker } from '@prisma/client';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';

@Injectable()
export class UpdateDressmakerService {
  constructor(private prismaService: PrismaService) {}

  async execute(id: string, { ...rest }: Dressmaker): Promise<Dressmaker> {
    const dressmaker = await this.prismaService.dressmaker.update({
      where: { id },
      data: { ...rest },
    });

    delete dressmaker.password;

    return dressmaker;
  }
}
