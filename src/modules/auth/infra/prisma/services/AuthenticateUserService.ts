import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { IAuthFieldsRequiredDTO } from '../../../dtos/IAuthFieldsRequiredDTO';
import { IResponseAuthDTO } from '../../../dtos/IResponseAuthDTO';
import secrets from '../../../../../shared/config/auth/secrets';
import ErrorHandling from '../../../../../shared/errors/ErrorHandling';

@Injectable()
export class AuthenticateUsersService {
  constructor(
    private prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async execute({
    email,
    password,
  }: IAuthFieldsRequiredDTO): Promise<IResponseAuthDTO> {
    try {
      let user = await this.prismaService.users.findFirst({
        where: { email },
      });

      if (!user) throw new UnauthorizedException('User not found');

      const verifyPass = await compare(password, user.password);

      if (!verifyPass)
        throw new BadRequestException('Combination e-mail/password failed');

      const token = sign({ id: user.id, email: user.email }, secrets.secret, {
        expiresIn: secrets.expiresIn,
        subject: user.id,
      });

      delete user.password;

      return {
        token,
        user,
      };
    } catch (err) {
      this.logger.error(err);
      throw new ErrorHandling(err);
    }
  }
}
