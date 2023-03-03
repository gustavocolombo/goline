import { Injectable, NotFoundException } from '@nestjs/common';
import { Dressmaker } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { DressmakerRepository } from '../repositories/dressmakers.repository';

@Injectable()
export class GetDressmakerService {
  constructor(private dressmakersRepository: DressmakerRepository) {}

  async execute(dressmaker: Dressmaker): Promise<Dressmaker> {
    try {
      const verifyDressmaker = await this.dressmakersRepository.findOne(
        dressmaker.id,
      );

      if (!verifyDressmaker)
        throw new NotFoundException('Dressmaker not found');

      delete verifyDressmaker.password;

      return verifyDressmaker;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
