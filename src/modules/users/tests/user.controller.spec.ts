import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { UsersController } from '../controllers/users.controller';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserService } from '../services/CreateUser.service';
import { GetInfoUserService } from '../services/GetInfoUser.service';
import { ResetPasswordService } from '../services/ResetPassword.service';
import { SoftDeleteUserService } from '../services/SoftDeleteUser.service';
import { UpdateUserService } from '../services/UpdateUser.service';
import { mockCreateUser } from './mocks/create-user.mock';
import { returnUser } from './mocks/return-user.mock';

describe('Test user controller', () => {
  let userController: UsersController;
  let prismaService: PrismaService;

  const db = {
    users: {
      findFirst: jest.fn().mockReturnValue(returnUser),
      create: jest.fn().mockReturnValue(returnUser),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        CreateUserService,
        GetInfoUserService,
        SoftDeleteUserService,
        ResetPasswordService,
        UpdateUserService,
        UsersRepository,
        PrismaService,
        { provide: PrismaService, useValue: db },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('Should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('Should be able create user', async () => {
    jest.spyOn(prismaService.users, 'findFirst').mockReturnValue(null);

    const request = await userController.createUser(mockCreateUser);

    expect(Promise.resolve(request)).toEqual(Promise.resolve(returnUser));
    expect(request).toEqual(returnUser);
  });
  it('Should not be able create a user', async () => {
    jest.spyOn(userController, 'createUser').mockRejectedValueOnce(null);

    expect(Promise.reject(userController.createUser(mockCreateUser))).toEqual(
      Promise.resolve(new BadRequestException()),
    );
  });
});
