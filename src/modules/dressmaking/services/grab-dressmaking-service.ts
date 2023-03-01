import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
      const [user, dressmaking] = await Promise.allSettled([
        await this.userRepository.findOne(user_id),
        await this.dressmakingRepository.findFirst(dressmaking_id),
      ]);

      if (!user) throw new NotFoundException('User not found');

      if (!dressmaking) throw new NotFoundException('Dressmaking not found');

      if (
        dressmaking.status === 'fulfilled' &&
        dressmaking.value.grabbed === true
      )
        throw new UnauthorizedException('Dressmaking is already grabbed');

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
