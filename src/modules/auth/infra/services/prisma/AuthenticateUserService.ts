import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { IAuthFieldsRequiredDTO } from '../../../dtos/IAuthFieldsRequiredDTO';
import { IResponseAuthDTO } from '../../../dtos/IResponseAuthDTO';
import secrets from '../../../../../shared/config/auth/secrets';
import ErrorHandling from '../../../../../shared/errors/ErrorHandling';
import { Dressmaker, Users } from '@prisma/client';

@Injectable()
export class AuthenticateUsersService {
  constructor(
    private prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async execute({
    email,
    password,
  }: IAuthFieldsRequiredDTO): Promise<IResponseAuthDTO<Users | Dressmaker>> {
    try {
      let dressmaker = await this.prismaService.dressmaker.findFirst({
        where: { email },
      });

      let user = await this.prismaService.users.findFirst({
        where: { email },
      });

      if (user) {
        const verifyPass = await compare(password, user.password);

        if (!verifyPass)
          throw new BadRequestException('Combination e-mail/password failed');

        const token = sign(
          { id: user.id, email: user.email, roles: user.roles },
          secrets.secret,
          {
            expiresIn: secrets.expiresIn,
            subject: user.id,
          },
        );

        delete user.password;

        return {
          token,
          user,
        };
      } else if (dressmaker) {
        const verifyPass = await compare(password, dressmaker.password);

        if (!verifyPass)
          throw new BadRequestException('Combination e-mail/password failed');

        const token = sign(
          {
            id: dressmaker.id,
            email: dressmaker.email,
            roles: dressmaker.roles,
          },
          secrets.secret,
          {
            expiresIn: secrets.expiresIn,
            subject: dressmaker.id,
          },
        );

        delete dressmaker.password;

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
