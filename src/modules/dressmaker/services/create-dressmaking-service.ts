import { BadRequestException, Injectable } from '@nestjs/common';
import { Dressmaking, StatusUser } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { CreateDressmakingDTO } from '../dtos/CreateDressmakingDTO';

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
    tag,
  }: CreateDressmakingDTO): Promise<Dressmaking> {
    try {
      const verifyDressmaker = await this.prismaService.dressmaker.findFirst({
        where: { AND: [{ id: dressmaker_id }, { status: StatusUser.ACTIVE }] },
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
          tag,
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
