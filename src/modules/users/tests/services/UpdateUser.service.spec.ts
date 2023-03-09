import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Users } from '@prisma/client';
import { UsersRepository } from '../../repositories/users.repository';
import { UpdateUserService } from '../../services/UpdateUser.service';
import {
  returnAllUsersMock,
  returnUpdateUserMock,
} from '../mocks/return-update-user.mock';
import { returnUser } from '../mocks/return-user.mock';
import { updateUserMock } from '../mocks/update-user.mock';

describe('Testing update user service', () => {
  let service: UpdateUserService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            findAllUsers: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('Test service definition', () => {
    it('Service and repository should be defined', async () => {
      expect([service, usersRepository]).toBeDefined();
    });
  });

  describe('Test happy trial update user', () => {
    it('Should be able update a user', async () => {
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockReturnValue(Promise.resolve(returnUser));
      jest
        .spyOn(usersRepository, 'findAllUsers')
        .mockReturnValue(Promise.resolve(returnAllUsersMock));
      jest
        .spyOn(usersRepository, 'update')
        .mockReturnValue(Promise.resolve(updateUserMock as Users));

      const request = await service.execute(updateUserMock);

      expect(request).toEqual(returnUpdateUserMock);
      expect(request).not.toEqual(returnUser);
      expect(returnAllUsersMock[0].id).toEqual(returnUser.id);
      expect(usersRepository.findByEmail).toHaveBeenCalled();
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersRepository.findAllUsers).toHaveBeenCalledTimes(1);
      expect(usersRepository.findAllUsers).toHaveBeenCalled();
      expect(usersRepository.update).toHaveBeenCalled();
      expect(usersRepository.update).toHaveBeenCalledTimes(1);
      expect(usersRepository.update).toHaveBeenCalledWith(updateUserMock);
      expect(usersRepository.update).toHaveReturned();
    });
  });

  describe('Test sad trial update user', () => {
    it('Should not be able update a user', async () => {
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockReturnValueOnce(Promise.resolve(returnUser));
      jest
        .spyOn(usersRepository, 'findAllUsers')
        .mockResolvedValueOnce(Promise.resolve(returnAllUsersMock));
      jest
        .spyOn(usersRepository, 'update')
        .mockResolvedValue(Promise.reject(updateUserMock as Users));

      await expect(service.execute(returnAllUsersMock[0])).rejects.toEqual(
        new BadRequestException('E-mail already registered by other user'),
      );
      expect(returnAllUsersMock[0].id).toBe(returnUser.id);
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersRepository.findByEmail).toHaveBeenCalled();
      expect(usersRepository.findByEmail).toHaveBeenCalledWith(
        returnUser.email,
      );
      expect(usersRepository.findAllUsers).toHaveBeenCalledTimes(1);
      expect(usersRepository.findAllUsers).toHaveBeenCalled();
      expect(usersRepository.update).not.toHaveBeenCalled();
    });
    it('Should not update user, user not found', async () => {
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(service.execute(updateUserMock)).rejects.toEqual(
        new BadRequestException('User not found!'),
      );
      expect(usersRepository.findByEmail).toHaveBeenCalled();
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersRepository.update).not.toHaveBeenCalled();
    });
  });
});
