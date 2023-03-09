import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DressmakerRepository } from '../../repositories/dressmakers.repository';
import { CreateDressmakerService } from '../../services/CreateDressmaker.service';
import { mockCreateDressmaker } from '../mocks/mock-create-dressmaker';
import { mockReturnDressmaker } from '../mocks/mock-return-dressmaker';

describe('Test create dressmaker service', () => {
  let service: CreateDressmakerService;
  let dressmakerRepository: DressmakerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDressmakerService,
        {
          provide: DressmakerRepository,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateDressmakerService>(CreateDressmakerService);
    dressmakerRepository =
      module.get<DressmakerRepository>(DressmakerRepository);
  });

  describe('Test service and repository defintion', () => {
    it('Service and repository should be defined', () => {
      expect([service, dressmakerRepository]).toBeDefined();
    });
  });

  describe('Test happy trial create dressmaker', () => {
    it('Should be able create a dressmaker', async () => {
      jest
        .spyOn(dressmakerRepository, 'findByEmail')
        .mockResolvedValueOnce(Promise.resolve(null));

      jest
        .spyOn(dressmakerRepository, 'create')
        .mockReturnValueOnce(Promise.resolve(mockReturnDressmaker));

      const response = await service.execute(mockCreateDressmaker);

      expect(response).toEqual(mockReturnDressmaker);
      expect(dressmakerRepository.findByEmail).toHaveBeenCalled();
      expect(dressmakerRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(dressmakerRepository.findByEmail).toHaveBeenCalledWith(
        mockCreateDressmaker.email,
      );
      expect(dressmakerRepository.create).toHaveBeenCalled();
      expect(dressmakerRepository.create).toHaveBeenCalledTimes(1);
      expect(dressmakerRepository.create).toHaveBeenCalledWith(
        mockCreateDressmaker,
      );
      expect(dressmakerRepository.create).toHaveReturned();
    });
  });

  describe('Test sad trial create dressmaker', () => {
    it('Should not be able create a new dressmaker, user already exists', async () => {
      jest
        .spyOn(dressmakerRepository, 'findByEmail')
        .mockReturnValueOnce(Promise.resolve(mockReturnDressmaker));

      jest
        .spyOn(dressmakerRepository, 'create')
        .mockRejectedValueOnce(Promise.resolve(mockReturnDressmaker));

      await expect(service.execute(mockCreateDressmaker)).rejects.toThrow(
        new BadRequestException('User with email already exists'),
      );
      expect(dressmakerRepository.findByEmail).toHaveBeenCalled();
      expect(dressmakerRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(dressmakerRepository.findByEmail).toHaveBeenCalledWith(
        mockCreateDressmaker.email,
      );
      expect(dressmakerRepository.findByEmail).toHaveReturnedTimes(1);
      expect(dressmakerRepository.create).not.toHaveBeenCalled();
      expect(dressmakerRepository.create).toHaveBeenCalledTimes(0);
    });
    it('Should not be able create dressmaker with empty data', async () => {
      jest
        .spyOn(dressmakerRepository, 'create')
        .mockRejectedValueOnce(Promise.reject(mockCreateDressmaker));

      jest
        .spyOn(service, 'execute')
        .mockRejectedValueOnce(Promise.reject(mockCreateDressmaker));

      await expect(service.execute(null)).rejects.toStrictEqual(
        Promise.reject({}),
      );
      expect(dressmakerRepository.findByEmail).not.toHaveBeenCalled();
      expect(dressmakerRepository.create).not.toHaveBeenCalled();
    });
  });
});
