import { BadRequestException, Injectable } from '@nestjs/common';
import { Dressmaker } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { CreateDressmakerDTO } from '../dtos/CreateDressmakerDTO';
import { DressmakerRepository } from '../repositories/dressmakers.repository';

@Injectable()
export class CreateDressmakerService {
  constructor(private dressmakersRepository: DressmakerRepository) {}

  async execute({
    name,
    email,
    password,
    cellphone,
    expertise,
    city,
    lat,
    lng,
    neighborhoud,
    number,
    street,
    zip_code,
  }: CreateDressmakerDTO): Promise<Dressmaker> {
    try {
      let dressmaker = await this.dressmakersRepository.findByEmail(email);

      if (!dressmaker) {
        dressmaker = await this.dressmakersRepository.create({
          name,
          email,
          password,
          cellphone,
          expertise,
          city,
          lat,
          lng,
          neighborhoud,
          number,
          street,
          zip_code,
        });
      } else {
        throw new BadRequestException('User with email already exists');
      }

      delete dressmaker.password;

      return dressmaker;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
