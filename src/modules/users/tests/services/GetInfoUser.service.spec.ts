import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../../repositories/users.repository';
import { GetInfoUserService } from '../../services/GetInfoUser.service';
import { returnUser } from '../mocks/return-user.mock';

describe('Tesing get user service', () => {
  let service: GetInfoUserService;
  let usersRepository: UsersRepository;

  const user_id = 'f5bfff7a-d7d8-4500-91fd-277f072e9131';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetInfoUserService,
        {
          provide: UsersRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetInfoUserService>(GetInfoUserService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Test service definition', () => {
    it('Service and repository should be defined', () => {
      expect([service, usersRepository]).toBeDefined();
    });
  });

  describe('Testing happy trial get user info', () => {
    it('Should be able get a user created', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockReturnValueOnce(Promise.resolve(returnUser));

      const request = await service.execute({ user_id: user_id });

      expect(request).toEqual(returnUser);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveReturned();
      expect(usersRepository.findOne).toHaveBeenCalledWith(user_id);
    });
  });

  describe('Testing sad trial get user info', () => {
    it('Should not be able get user if he does not exists', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockReturnValueOnce(Promise.resolve(null));

      expect(service.execute({ user_id })).rejects.toThrow(
        new NotFoundException('User not found'),
      );
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveReturnedTimes(1);
      expect(usersRepository.findOne(user_id)).toBe(undefined);
      expect(usersRepository.findOne).toHaveBeenCalledWith(user_id);
    });
  });
});
