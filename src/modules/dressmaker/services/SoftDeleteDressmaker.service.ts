import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Dressmaker, StatusUser } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { DressmakerRepository } from '../repositories/dressmakers.repository';

@Injectable()
export class SoftDeleteDressmakerService {
  constructor(private dressmakersRepository: DressmakerRepository) {}

  async execute(dressmaker: Dressmaker): Promise<Dressmaker> {
    try {
      const checkDressmaker = await this.dressmakersRepository.findOne(
        dressmaker.id,
      );

      if (!checkDressmaker) throw new NotFoundException('Dressmaker not found');

      if (
        checkDressmaker.status === StatusUser.INACTIVE ||
        checkDressmaker.status === StatusUser.DELETED
      ) {
        throw new BadRequestException('User is already inactive/deleted');
      }

      const softDeletedDressmaker = await this.dressmakersRepository.softDelete(
        dressmaker,
      );

      delete softDeletedDressmaker.password;

      return softDeletedDressmaker;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
