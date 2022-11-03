import { BadRequestException, Injectable } from '@nestjs/common';
import { Dressmaking } from '@prisma/client';
import ErrorHandling from '../../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { ICreateDressmakingDTO } from '../../../dtos/ICreateDressmakingDTO';

@Injectable()
export class CreateDressmakingService {
  constructor(private prismaService: PrismaService) {}

  async execute({
    name_service,
    price,
    start_date,
    end_date,
    dressmaker_id,
    grabbed,
    description,
  }: ICreateDressmakingDTO): Promise<Dressmaking> {
    try {
      const verifyDressmaker = await this.prismaService.dressmaker.findFirst({
        where: { id: dressmaker_id },
      });

      if (!verifyDressmaker)
        throw new BadRequestException('Dressmaker not found');

      const dressmaking = await this.prismaService.dressmaking.create({
        data: {
          name_service,
          price,
          start_date,
          end_date,
          dressmaker_id,
          grabbed,
          description,
        },
        include: {
          dressmaker: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });

      return dressmaking;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
