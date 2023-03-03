import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { UsersRepository } from '../repositories/users.repository';
import { GetInfoUserService } from '../services/GetInfoUser.service';
import { returnUser } from './mocks/return-user.mock';

describe('Tesing get user service', () => {
  let service: GetInfoUserService;
  let prismaService: PrismaService;

  const db = {
    users: {
      findUnique: jest.fn().mockReturnValue(returnUser),
    },
  };

  const user_id = 'f5bfff7a-d7d8-4500-91fd-277f072e9131';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetInfoUserService,
        PrismaService,
        UsersRepository,
        { provide: PrismaService, useValue: db },
      ],
    }).compile();

    service = module.get<GetInfoUserService>(GetInfoUserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Service should be defined', () => {
    expect([prismaService, service]).toBeDefined();
  });

  describe('Testing get information user function ', () => {
    it('Should be able get a user created', async () => {
      const request = await service.execute({ user_id: user_id });

      expect(request).toEqual(returnUser);
      expect(prismaService.users.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.users.findUnique).toHaveBeenCalledWith({
        where: { id: user_id },
        include: {
          address: true,
        },
      });
    });
    it('Should not be able get a user create', async () => {
      expect(service.execute({ user_id })).toEqual(Promise.reject({}));
      expect(prismaService.users.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.users.findUnique).toHaveBeenCalledWith({
        where: { id: user_id },
        include: {
          address: true,
        },
      });
    });
  });
});
