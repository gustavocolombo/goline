import { Injectable, NotFoundException } from '@nestjs/common';
import { Dressmaker } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { UpdateDressmakerDTO } from '../dtos/UpdateDressmakerDTO';
import { DressmakerRepository } from '../repositories/dressmakers.repository';

@Injectable()
export class UpdateDressmakerService {
  constructor(private dressmakersRepository: DressmakerRepository) {}

  async execute(
    dressmaker: Dressmaker,
    dressmakerDTO: UpdateDressmakerDTO,
  ): Promise<Dressmaker> {
    try {
      const checkDressmaker = await this.dressmakersRepository.findById(
        dressmaker.id,
      );

      if (!checkDressmaker) throw new NotFoundException('Dressmaker not found');

      const updatedDressmaker = await this.dressmakersRepository.update(
        dressmaker,
        dressmakerDTO,
      );

      delete updatedDressmaker.password;

      return updatedDressmaker;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
