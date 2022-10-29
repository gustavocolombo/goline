import { Test, TestingModule } from '@nestjs/testing';
import { GetDressmakingsService } from './get-dressmakings-service';

describe('GetDressmakingsService', () => {
  let provider: GetDressmakingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetDressmakingsService],
    }).compile();

    provider = module.get<GetDressmakingsService>(GetDressmakingsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
