import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StatusUser } from '@prisma/client';
import { UsersRepository } from '../../repositories/users.repository';
import { SoftDeleteUserService } from '../../services/SoftDeleteUser.service';
import { returnUser, returnUseSoftDeleted } from '../mocks/return-user.mock';

const emailMockSoftDeleteUser = 'johndoe@gmail.com';

describe('Testing soft delete user service', () => {
  let service: SoftDeleteUserService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoftDeleteUserService,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            softDelete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SoftDeleteUserService>(SoftDeleteUserService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('Test service definition', () => {
    it('Service and repository should be defined', async () => {
      expect([service, usersRepository]).toBeDefined();
    });
  });

  describe('Test happy trial soft delete user', () => {
    it('Should be able soft delete a user', async () => {
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockReturnValue(Promise.resolve(returnUser));
      jest
        .spyOn(usersRepository, 'softDelete')
        .mockImplementation(() => Promise.resolve(returnUseSoftDeleted));

      expect(emailMockSoftDeleteUser.trim().length > 0).toBeTruthy();

      console.log('email', emailMockSoftDeleteUser.length);

      const request = await service.execute({ email: emailMockSoftDeleteUser });

      expect(request).toBe(returnUseSoftDeleted);
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersRepository.findByEmail).toHaveBeenCalled();
      expect(usersRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(usersRepository.softDelete).toHaveBeenCalled();
      expect(request.status).not.toEqual(StatusUser.ACTIVE);
      expect(request.status).toBe(StatusUser.INACTIVE);
    });
  });

  describe('Test sad trial update user', () => {
    it('Should not be able soft delete a user, user not found', async () => {
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockReturnValueOnce(Promise.resolve(null));
      jest
        .spyOn(usersRepository, 'softDelete')
        .mockImplementation(() => Promise.reject(returnUseSoftDeleted));

      await expect(
        service.execute({ email: emailMockSoftDeleteUser }),
      ).rejects.toEqual(new BadRequestException('User not found!'));
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersRepository.findByEmail).toHaveBeenCalled();
      expect(usersRepository.softDelete).toHaveBeenCalledTimes(0);
      expect(usersRepository.softDelete).not.toHaveBeenCalled();
    });

    it('Should not be able soft delete a user, e-mail not provided', async () => {
      const emailMockSoftDeleteUserSpyed = '';

      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockReturnValueOnce(Promise.resolve(null));
      jest
        .spyOn(usersRepository, 'softDelete')
        .mockImplementation(() => Promise.reject(returnUseSoftDeleted));

      expect(emailMockSoftDeleteUserSpyed.length > 0).toBeFalsy();

      await expect(
        service.execute({ email: emailMockSoftDeleteUser }),
      ).rejects.toEqual(new BadRequestException('User not found!'));
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersRepository.findByEmail).toHaveBeenCalled();
      expect(usersRepository.softDelete).toHaveBeenCalledTimes(0);
      expect(usersRepository.softDelete).not.toHaveBeenCalled();
    });
  });
});
