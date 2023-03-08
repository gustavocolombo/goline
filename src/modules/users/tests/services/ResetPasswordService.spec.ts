import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../../repositories/users.repository';
import { ResetPasswordService } from '../../services/ResetPassword.service';
import {
  returnUser,
  returnUserWithPassReseted,
} from '../mocks/return-user.mock';

const emailResetPasswordMock = 'johndoe@gmail.com';

describe('Testing soft delete user service', () => {
  let service: ResetPasswordService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordService,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ResetPasswordService>(ResetPasswordService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('Test service definition', () => {
    it('Service and repository should be defined', async () => {
      expect([service, usersRepository]).toBeDefined();
    });
  });

  describe('Test happy trial reset password user', () => {
    it('Should be able reset password of user', async () => {
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockReturnValueOnce(Promise.resolve(returnUser));
      jest
        .spyOn(usersRepository, 'update')
        .mockImplementation(() => Promise.resolve(returnUserWithPassReseted));

      expect(emailResetPasswordMock.trim().length > 0).toBeTruthy();

      const request = await service.execute({
        email: emailResetPasswordMock,
        new_password: 'newPass123',
      });

      expect(request.password).not.toEqual(returnUser.password);
      expect(request.password).toEqual(returnUserWithPassReseted.password);
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersRepository.findByEmail).toHaveBeenCalled();
      expect(usersRepository.update).toHaveBeenCalledTimes(1);
      expect(usersRepository.update).toHaveBeenCalled();
    });
  });

  describe('Test sad trial reset password user', () => {
    it('Should not be able reset password of user, user not found', async () => {
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockReturnValue(Promise.resolve(null));
      jest
        .spyOn(usersRepository, 'update')
        .mockImplementation(() => Promise.reject(returnUser));

      expect(emailResetPasswordMock.trim().length > 0).toBeTruthy();

      expect(
        service.execute({
          email: emailResetPasswordMock,
          new_password: 'newPass123',
        }),
      ).rejects.toEqual(new BadRequestException('User not found!'));
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(usersRepository.findByEmail).toHaveBeenCalled();
      expect(usersRepository.update).toHaveBeenCalledTimes(0);
      expect(usersRepository.update).not.toHaveBeenCalled();
    });
  });
});
