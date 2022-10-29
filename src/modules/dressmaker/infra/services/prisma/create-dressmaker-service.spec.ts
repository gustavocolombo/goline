import { Test, TestingModule } from '@nestjs/testing';
import { CreateDressmakerService } from './create-dressmaker-service';

describe('CreateDressmakerService', () => {
  let provider: CreateDressmakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateDressmakerService],
    }).compile();

    provider = module.get<CreateDressmakerService>(CreateDressmakerService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
