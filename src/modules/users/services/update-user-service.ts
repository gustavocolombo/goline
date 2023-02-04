import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { UsersRepository } from '../repositories/users.repository';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ ...rest }: UpdateUserDTO): Promise<Users> {
    try {
      const user = await this.usersRepository.findByEmail(rest.email);

      if (!user) throw new BadRequestException('User not found!');

      const updatedUser = await this.usersRepository.update({ ...rest });

      return updatedUser;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
