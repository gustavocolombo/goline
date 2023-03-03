import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { CreateUserService } from '../services/CreateUser.service';
import { UsersRepository } from '../repositories/users.repository';
import { returnUser } from './mocks/return-user.mock';
import { mockCreateUser } from './mocks/create-user.mock';

describe('Testing create user', () => {
  let prismaService: PrismaService;
  let service: CreateUserService;

  const db = {
    users: {
      findFirst: jest.fn().mockReturnValue(returnUser),
      create: jest.fn().mockReturnValue(returnUser),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        UsersRepository,
        PrismaService,
        { provide: PrismaService, useValue: db },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Service should be defined', () => {
    expect([service, prismaService]).toBeDefined();
  });

  describe('Testing create user service', () => {
    it('Should be able create user', async () => {
      jest.spyOn(prismaService.users, 'findFirst').mockReturnValue(null);

      const users = await service.execute(mockCreateUser);

      expect(users).toEqual(returnUser);
      expect(prismaService.users.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaService.users.findFirst).toHaveBeenLastCalledWith({
        where: { email: users.email },
      });
      expect(prismaService.users.findFirst).toHaveReturnedTimes(1);
      expect(prismaService.users.findFirst).toHaveReturnedWith(null);
      expect(prismaService.users.create).toHaveReturnedTimes(1);
    });
    it('Should not be able create user', async () => {
      expect(service.execute(mockCreateUser)).toEqual(Promise.reject({}));
      expect(prismaService.users.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaService.users.findFirst).toHaveBeenLastCalledWith({
        where: { email: mockCreateUser.email },
      });
      expect(prismaService.users.findFirst).toHaveReturnedTimes(1);
      expect(prismaService.users.findFirst).toHaveReturnedWith(null);
      expect(prismaService.users.create).toHaveReturnedTimes(0);
    });
  });
});
