import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IAuthFieldsRequiredDTO } from '../dtos/IAuthFieldsRequiredDTO';
import { UsersResponse } from '../dtos/IResponseAuthDTO';
import secrets from '../../../shared/config/auth/secrets';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { UsersRepository } from '../../users/repositories/users.repository';
import { DressmakerRepository } from '../../dressmaker/repositories/dressmakers.repository';

@Injectable()
export class AuthenticateUsersService {
  constructor(
    private dressmakerRepository: DressmakerRepository,
    private userRepository: UsersRepository,
    private readonly logger: Logger,
  ) {}

  async execute({
    email,
    password,
  }: IAuthFieldsRequiredDTO): Promise<UsersResponse> {
    try {
      const [user, dressmaker] = await Promise.allSettled([
        await this.userRepository.findByEmail(email),
        await this.dressmakerRepository.findByEmail(email),
      ]);

      if (user.status === 'rejected' || dressmaker.status === 'rejected') {
        throw new NotFoundException('User not found');
      }

      if (user.value) {
        const verifyPass = await compare(password, user.value.password);

        if (!verifyPass)
          throw new BadRequestException('Combination e-mail/password failed');

        const token = sign(
          {
            id: user.value.id,
            email: user.value.email,
            roles: user.value.roles,
          },
          secrets.secret,
          {
            expiresIn: secrets.expiresIn,
            subject: user.value.id,
          },
        );

        delete user.value.password;

        return {
          token,
          user,
        };
      } else if (dressmaker.value) {
        const verifyPass = await compare(password, dressmaker.value.password);

        if (!verifyPass)
          throw new BadRequestException('Combination e-mail/password failed');

        const token = sign(
          {
            id: dressmaker.value.id,
            email: dressmaker.value.email,
            roles: dressmaker.value.roles,
          },
          secrets.secret,
          {
            expiresIn: secrets.expiresIn,
            subject: dressmaker.value.id,
          },
        );

        delete dressmaker.value.password;

        return {
          token,
          user: dressmaker,
        };
      } else {
        throw new BadRequestException('User not found');
      }
    } catch (err) {
      this.logger.error(err);
      throw new ErrorHandling(err);
    }
  }
}
