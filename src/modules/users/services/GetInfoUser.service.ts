import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '@prisma/client';
import { GetUserInfoDTO } from '../dtos/GetUserInfoDTO';
import { UsersRepository } from '../repositories/users.repository';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class GetInfoUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ user_id }: GetUserInfoDTO): Promise<Users | undefined> {
    try {
      const user = await this.usersRepository.findOne(user_id);

      if (!user) throw new NotFoundException('User not found');

      delete user.password;

      return user;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
