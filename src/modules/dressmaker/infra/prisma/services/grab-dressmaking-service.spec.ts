import { Test, TestingModule } from '@nestjs/testing';
import { GrabDressmakingService } from './grab-dressmaking-service';

describe('GrabDressmakingService', () => {
  let provider: GrabDressmakingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrabDressmakingService],
    }).compile();

    provider = module.get<GrabDressmakingService>(GrabDressmakingService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
