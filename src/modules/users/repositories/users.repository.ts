import { Address, RolesUser, StatusUser, Users } from '@prisma/client';
import { hash } from 'bcryptjs';
import { CrudUserInterface } from '../implementations/crud.interface';
import { PrismaService } from '@shared/infra/prisma/prisma.service';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { SoftDeleteUserDTO } from '../dtos/SoftDeleteUserDTO';
import ErrorHandling from '@shared/errors/ErrorHandling';

@Injectable()
export class UsersRepository implements CrudUserInterface {
  constructor(private prismaService: PrismaService) {}

  async create({
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
    zip_code,
  }: CreateUserDTO): Promise<Users> {
    try {
      const user = await this.prismaService.users.create({
        data: {
          name: name,
          email,
          password: await hash(password, 8),
          cellphone,
          height,
          weight,
          roles: RolesUser.USER,
          status: StatusUser.ACTIVE,
          address: {
            create: {
              city,
              street,
              neighborhoud,
              number,
              lat,
              lng,
              zip_code,
            },
          },
        },
        include: {
          address: true,
        },
      });

      return user;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findOne(id: string): Promise<Users | undefined> {
    try {
      const user = await this.prismaService.users.findUnique({
        where: { id },
        include: { address: true },
      });

      return user;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async update({ ...rest }: UpdateUserDTO): Promise<Users> {
    try {
      const user = await this.prismaService.users.update({
        where: { email: rest.email },
        data: {
          ...rest,
        },
      });

      return user;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async softDelete({ email }: SoftDeleteUserDTO): Promise<Users> {
    try {
      const user = await this.prismaService.users.update({
        where: { email },
        data: {
          status: StatusUser.INACTIVE,
        },
      });

      return user;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findByEmail(email: string): Promise<Users> {
    try {
      const user = await this.prismaService.users.findFirst({
        where: { email },
      });

      return user;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async delete(data: Users): Promise<Users> {
    try {
      const user = await this.prismaService.users.delete({
        where: { id: data.id },
      });

      return user;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async findAllUsers(): Promise<Users[]> {
    try {
      const users = await this.prismaService.users.findMany();

      return users;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async getAddressUser(user_id: string): Promise<Address[]> {
    try {
      const address = await this.prismaService.address.findMany({
        where: { users_id: user_id },
      });

      return address;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
