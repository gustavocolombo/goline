import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { SoftDeleteUserDTO } from '../dtos/SoftDeleteUserDTO';
import { UsersRepository } from '../repositories/users.repository';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class SoftDeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email }: SoftDeleteUserDTO): Promise<Users> {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) throw new BadRequestException('User not found!');

      const updatedUser = await this.usersRepository.softDelete({ email });

      delete updatedUser.password;

      return updatedUser;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
