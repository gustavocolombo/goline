import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      const checkDressmaker = await this.dressmakersRepository.findOne(
        dressmaker.id,
      );

      if (!checkDressmaker) throw new NotFoundException('Dressmaker not found');

      if (dressmaker.email === dressmakerDTO.email)
        throw new BadRequestException('E-mail já está sendo usado por você');

      const checkEmailDressmakers = await this.dressmakersRepository.findAll();

      checkEmailDressmakers.forEach((dressmaker) => {
        if (dressmaker.email === dressmakerDTO.email) {
          throw new BadRequestException(
            'E-mail já está sendo utilizado por outro usuário',
          );
        }
      });

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
