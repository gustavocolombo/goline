import { BadRequestException, Injectable } from '@nestjs/common';
import { Dressmaking } from '@prisma/client';
import { UsersRepository } from '../../users/repositories/users.repository';
import { GrabDressmakingDTO } from '../dtos/GrabDressmakingDTO';
import { DressmakingsRepository } from '../repositories/dressmakings.repository';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class GrabDressmakingService {
  constructor(
    private dressmakingRepository: DressmakingsRepository,
    private userRepository: UsersRepository,
  ) {}
  async execute({
    user_id,
    dressmaking_id,
  }: GrabDressmakingDTO): Promise<Dressmaking> {
    try {
      const user = await this.userRepository.findOne(user_id);

      const dressmaking = await this.dressmakingRepository.findFirst(
        dressmaking_id,
      );

      if (!user) throw new BadRequestException('User not found');

      if (!dressmaking) throw new BadRequestException('Dressmaking not found');

      const grabbedDressmaking =
        await this.dressmakingRepository.grabDressmaking({
          dressmaking_id,
          user_id,
        });

      return grabbedDressmaking;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
