import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Users, UsersToken } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { isAfter } from 'date-fns';
import ErrorHandling from '../../../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import SendEmailConfirmRecoverPasswordService from '../../../../mail/infra/services/SendMailWithTokenService';
import RedefinePasswordDTO from '../../../dtos/RedefinePasswordDTO';

@Injectable()
class RedefinePasswordService {
  constructor(
    private prismaService: PrismaService,
    private mail: SendEmailConfirmRecoverPasswordService,
  ) {}

  async execute({
    token,
    password,
    confirmPassword,
  }: RedefinePasswordDTO): Promise<Users> {
    try {
      const tokenRedefinePassword: UsersToken =
        await this.prismaService.usersToken.findFirst({
          where: { token },
        });

      if (!tokenRedefinePassword) {
        throw new NotFoundException('This token does not exists in database');
      }

      const user: Users = await this.prismaService.users.findFirst({
        where: { id: tokenRedefinePassword.users_id },
      });

      if (!user) {
        throw new NotFoundException(
          'This user of this token does not exists in database',
        );
      }

      const tokens: Array<UsersToken> =
        await this.prismaService.usersToken.findMany({
          where: { users_id: user.id },
        });

      tokens.map((otherToken) => {
        if (
          !isAfter(tokenRedefinePassword.created_at, otherToken.created_at) &&
          otherToken.token != token
        ) {
          throw new UnauthorizedException('This token does not active');
        }
      });

      if (!isAfter(new Date(tokenRedefinePassword.expires_in), new Date())) {
        throw new UnauthorizedException('This token has expired');
      }

      if (
        tokenRedefinePassword.used ||
        tokenRedefinePassword.used_in !== null
      ) {
        throw new UnauthorizedException('This token was used previously');
      }

      if (password !== confirmPassword) {
        throw new UnauthorizedException(
          'This passwords repassed does not match',
        );
      }

      const newPasswordIsEqualLastPassword: boolean = await compare(
        password,
        user.password,
      );

      if (newPasswordIsEqualLastPassword) {
        throw new UnauthorizedException(
          'This new password is equal the last password, try other',
        );
      }

      const passwordHash: string = await hash(password, 8);

      const updatedUser: Users = await this.prismaService.users.update({
        data: { password: passwordHash },
        where: { id: user.id },
      });

      const updatedToken = await this.prismaService.usersToken.update({
        where: {
          id: tokenRedefinePassword.id,
        },
        data: {
          used: true,
          used_in: new Date(),
        },
      });

      await this.mail.execute({ user });

      delete updatedUser.password;

      return updatedUser;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}

export default RedefinePasswordService;
