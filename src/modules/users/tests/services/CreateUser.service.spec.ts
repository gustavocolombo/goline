import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '../../services/CreateUser.service';
import { UsersRepository } from '../../repositories/users.repository';
import { returnUser } from '../mocks/return-user.mock';
import { mockCreateUser } from '../mocks/create-user.mock';
import { BadRequestException } from '@nestjs/common';

describe('Testing create user', () => {
  let service: CreateUserService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing service definition', () => {
    it('Service and repository should be defined', () => {
      expect([service, usersRepository]).toBeDefined();
    });
  });

  describe('Testing happy trial create user', () => {
    it('Should be able create user', async () => {
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockReturnValueOnce(Promise.resolve(null));
      jest
        .spyOn(usersRepository, 'create')
        .mockImplementation(() => Promise.resolve(returnUser));

      const users = await service.execute(mockCreateUser);

      expect(users).toBe(returnUser);
      expect(usersRepository.create).toHaveBeenCalledWith(mockCreateUser);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersRepository.findByEmail).toHaveBeenCalledWith(
        mockCreateUser.email,
      );
    });
  });

  describe('Test sad trial create user', () => {
    it('Should not be able create user, returns an user alredy registered', async () => {
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockReturnValueOnce(Promise.resolve(returnUser));

      await expect(service.execute(mockCreateUser)).rejects.toEqual(
        new BadRequestException('User with e-mail already registered'),
      );
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersRepository.create).not.toHaveBeenCalled();
      expect(usersRepository.findByEmail).toHaveBeenCalledWith(
        mockCreateUser.email,
      );
    });
  });
});
