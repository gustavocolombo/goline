import { Test, TestingModule } from '@nestjs/testing';
import { DressmakerController } from './dressmaker.controller';

describe('DressmakerController', () => {
  let controller: DressmakerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DressmakerController],
    }).compile();

    controller = module.get<DressmakerController>(DressmakerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
