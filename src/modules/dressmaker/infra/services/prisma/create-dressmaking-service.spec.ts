import { Test, TestingModule } from '@nestjs/testing';
import { CreateDressmakingService } from './create-dressmaking-service';

describe('CreateDressmakingService', () => {
  let provider: CreateDressmakingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateDressmakingService],
    }).compile();

    provider = module.get<CreateDressmakingService>(CreateDressmakingService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
