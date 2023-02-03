import { Injectable } from '@nestjs/common';
import { Dressmaker } from '@prisma/client';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';

@Injectable()
export class GetDressmakerService {
  constructor(private prismaService: PrismaService) {}

  async execute(dressmaker: Dressmaker): Promise<Dressmaker> {
    const verifyDressmaker = await this.prismaService.dressmaker.findUnique({
      where: { id: dressmaker.id },
    });

    delete verifyDressmaker.password;

    return verifyDressmaker;
  }
}
