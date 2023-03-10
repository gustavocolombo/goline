import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DressmakerRepository } from '../../repositories/dressmakers.repository';
import { SoftDeleteDressmakerService } from '../../services/SoftDeleteDressmaker.service';
import {
  mockReturnDressmaker,
  mockReturnDressmakerSoftDeleted,
} from '../mocks/mock-return-dressmaker';

describe('Test create dressmaker service', () => {
  let service: SoftDeleteDressmakerService;
  let dressmakerRepository: DressmakerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoftDeleteDressmakerService,
        {
          provide: DressmakerRepository,
          useValue: {
            findOne: jest.fn(),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SoftDeleteDressmakerService>(
      SoftDeleteDressmakerService,
    );
    dressmakerRepository =
      module.get<DressmakerRepository>(DressmakerRepository);
  });

  describe('Test service and repository defintion', () => {
    it('Service and repository should be defined', () => {
      expect([service, dressmakerRepository]).toBeDefined();
    });
  });

  describe('Test happy trial soft delete dressmaker', () => {
    it('Should be able soft delete a dressmaker', async () => {
      jest
        .spyOn(dressmakerRepository, 'findOne')
        .mockResolvedValueOnce(Promise.resolve(mockReturnDressmaker));
      jest
        .spyOn(dressmakerRepository, 'softDelete')
        .mockReturnValueOnce(Promise.resolve(mockReturnDressmakerSoftDeleted));

      const response = await service.execute(mockReturnDressmaker);

      expect(response).toBe(mockReturnDressmakerSoftDeleted);
      expect(dressmakerRepository.findOne).toHaveBeenCalled();
      expect(dressmakerRepository.findOne).toHaveBeenCalledTimes(1);
      expect(dressmakerRepository.softDelete).toHaveBeenCalled();
      expect(dressmakerRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(dressmakerRepository.softDelete).toHaveReturned();
    });
  });

  describe('Test sad trial soft delete dressmaker', () => {
    it('Should not be able soft delete dressmaker, dressmaker not found', async () => {
      jest
        .spyOn(dressmakerRepository, 'findOne')
        .mockResolvedValueOnce(Promise.resolve(null));

      await expect(service.execute(mockReturnDressmaker)).rejects.toEqual(
        new NotFoundException('Dressmaker not found'),
      );
      expect(dressmakerRepository.findOne).toHaveBeenCalled();
      expect(dressmakerRepository.findOne).toHaveBeenCalledTimes(1);
      expect(dressmakerRepository.softDelete).not.toHaveBeenCalled();
      expect(dressmakerRepository.softDelete).toHaveBeenCalledTimes(0);
      expect(dressmakerRepository.softDelete).not.toHaveReturned();
    });
  });
  it('Should not be able soft delete dressmaker, dressmaker with status deleted', async () => {
    jest
      .spyOn(dressmakerRepository, 'findOne')
      .mockResolvedValueOnce(Promise.resolve(mockReturnDressmaker));

    mockReturnDressmaker.status = 'DELETED';

    await expect(service.execute(mockReturnDressmaker)).rejects.toEqual(
      new BadRequestException('User is already inactive/deleted'),
    );
    expect(dressmakerRepository.findOne).toHaveBeenCalled();
    expect(dressmakerRepository.findOne).toHaveBeenCalledTimes(1);
    expect(dressmakerRepository.softDelete).not.toHaveBeenCalled();
    expect(dressmakerRepository.softDelete).toHaveBeenCalledTimes(0);
    expect(dressmakerRepository.softDelete).not.toHaveReturned();
  });
  it('Should not be able soft delete dressmaker, dressmaker with status inactive', async () => {
    jest
      .spyOn(dressmakerRepository, 'findOne')
      .mockResolvedValueOnce(Promise.resolve(mockReturnDressmaker));

    mockReturnDressmaker.status = 'INACTIVE';

    await expect(service.execute(mockReturnDressmaker)).rejects.toEqual(
      new BadRequestException('User is already inactive/deleted'),
    );
    expect(dressmakerRepository.findOne).toHaveBeenCalled();
    expect(dressmakerRepository.findOne).toHaveBeenCalledTimes(1);
    expect(dressmakerRepository.softDelete).not.toHaveBeenCalled();
    expect(dressmakerRepository.softDelete).toHaveBeenCalledTimes(0);
    expect(dressmakerRepository.softDelete).not.toHaveReturned();
  });
});
