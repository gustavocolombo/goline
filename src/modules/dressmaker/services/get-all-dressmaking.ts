import { Injectable } from '@nestjs/common';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { GetAllDressmakingDTO } from '../dtos/GetDressmakingsDTO';
import { DressmakingsRepository } from '../repositories/dressmakings.repository';

@Injectable()
export class GetAllDressmakingService {
  constructor(private dressmakingRepository: DressmakingsRepository) {}

  async getAllDressmakings(
    skip?: number,
    take?: number,
  ): Promise<GetAllDressmakingDTO[]> {
    try {
      const getDressmaking =
        await this.dressmakingRepository.getAllDressmakings(skip, take);
      return getDressmaking;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
