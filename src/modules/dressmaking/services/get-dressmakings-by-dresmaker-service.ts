import { Injectable } from '@nestjs/common';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import {
  GetDressmakingDTO,
  ReturnDressmakingDTO,
} from '../dtos/GetDressmakingsDTO';
import { DressmakingsRepository } from '../repositories/dressmakings.repository';

@Injectable()
export class GetDressmakingsByDressmakerService {
  constructor(private dressmakingRepository: DressmakingsRepository) {}

  async execute({ id }: GetDressmakingDTO): Promise<ReturnDressmakingDTO[]> {
    try {
      const dressmakings =
        await this.dressmakingRepository.getDressmakingsByDressmaker({ id });

      return dressmakings;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
