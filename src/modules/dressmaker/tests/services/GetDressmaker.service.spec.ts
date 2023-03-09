import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DressmakerRepository } from '../../repositories/dressmakers.repository';
import { GetDressmakerService } from '../../services/GetDressmaker.service';
import { mockReturnDressmaker } from '../mocks/mock-return-dressmaker';

describe('Test create dressmaker service', () => {
  let service: GetDressmakerService;
  let dressmakerRepository: DressmakerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetDressmakerService,
        {
          provide: DressmakerRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetDressmakerService>(GetDressmakerService);
    dressmakerRepository =
      module.get<DressmakerRepository>(DressmakerRepository);
  });

  describe('Test service and repository defintion', () => {
    it('Service and repository should be defined', () => {
      expect([service, dressmakerRepository]).toBeDefined();
    });
  });

  describe('Test happy trial get dressmaker', () => {
    it('Should be able get a dressmaker', async () => {
      jest
        .spyOn(dressmakerRepository, 'findOne')
        .mockResolvedValueOnce(Promise.resolve(mockReturnDressmaker));

      const response = await service.execute(mockReturnDressmaker);

      expect(response).toEqual(mockReturnDressmaker);
      expect(dressmakerRepository.findOne).toHaveBeenCalled();
      expect(dressmakerRepository.findOne).toHaveBeenCalledTimes(1);
      expect(dressmakerRepository.findOne).toHaveReturned();
    });
  });

  describe('Test sad trial get dressmaker', () => {
    it('Should not be able get a dressmaker, dressmaker not found', async () => {
      jest
        .spyOn(dressmakerRepository, 'findOne')
        .mockResolvedValueOnce(Promise.reject(mockReturnDressmaker));

      await expect(service.execute(mockReturnDressmaker)).rejects.toEqual(
        new NotFoundException('User not found'),
      );
      expect(dressmakerRepository.findOne).toHaveBeenCalled();
      expect(dressmakerRepository.findOne).toHaveBeenCalledTimes(1);
      expect(dressmakerRepository.findOne).toHaveReturned();
    });
  });
});
