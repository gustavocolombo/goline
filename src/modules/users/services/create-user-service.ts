import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UsersRepository } from '../repositories/users.repository';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    cellphone,
    height,
    weight,
    city,
    street,
    neighborhoud,
    number,
    lat,
    lng,
  }: CreateUserDTO): Promise<Users> {
    try {
      let user = await this.usersRepository.findByEmail(email);

      if (user)
        throw new BadRequestException('User with e-mail already registered');

      if (!user) {
        user = await this.usersRepository.create({
          name,
          email,
          password,
          cellphone,
          height,
          weight,
          city,
          street,
          neighborhoud,
          number,
          lat,
          lng,
        });
      }
      delete user.password;

      return user;
    } catch (err) {
      throw new ErrorHandling(err);
    }
  }
}
