import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { ResetPasswordDTO } from '../dtos/ResetPasswordDTO';
import { UsersRepository } from '../repositories/users.repository';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class ResetPasswordService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, new_password }: ResetPasswordDTO): Promise<Users> {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) throw new BadRequestException('User not found!');

      const newPasswordHashed = await hash(new_password, 8);

      if (await compare(new_password, user.password)) {
        throw new BadRequestException(
          'The new password can not be the same as previous one',
        );
      }

      const updatedUser = await this.usersRepository.update({
        password: newPasswordHashed,
      });

      delete updatedUser.password;

      return updatedUser;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
