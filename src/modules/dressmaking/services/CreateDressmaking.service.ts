import { BadRequestException, Injectable } from '@nestjs/common';
import { Dressmaking } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { CreateDressmakingDTO } from '../dtos/CreateDressmakingDTO';
import { DressmakingsRepository } from '../repositories/dressmakings.repository';

@Injectable()
export class CreateDressmakingService {
  constructor(private dressmakingRepository: DressmakingsRepository) {}

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
      const verifyDressmaker =
        await this.dressmakingRepository.findFirstToCreate(dressmaker_id);

      if (!verifyDressmaker)
        throw new BadRequestException('Dressmaker not found or is inactive');

      const dressmaking = await this.dressmakingRepository.create({
        name_service,
        price,
        start_date,
        end_date,
        dressmaker_id,
        grabbed,
        description,
        tag,
      });

      return dressmaking;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
