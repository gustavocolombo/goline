import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { UsersRepository } from '../repositories/users.repository';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ ...rest }: UpdateUserDTO, id: string): Promise<Users> {
    try {
      const user = await this.usersRepository.findOne(id);

      if (!user) throw new BadRequestException('User not found!');

      const checkUserEmail = await this.usersRepository.findAllUsers();

      checkUserEmail.forEach((userCheck) => {
        if (userCheck.email === rest.email && userCheck.email != user.email) {
          throw new BadRequestException(
            'E-mail already registered by other user',
          );
        }
      });

      if (rest?.password)
        throw new BadRequestException(
          'The user password cannot be changed here',
        );

      const updatedUser = await this.usersRepository.update({ ...rest });

      delete updatedUser.password;

      return updatedUser;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
