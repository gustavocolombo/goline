import { Test, TestingModule } from '@nestjs/testing';
import { GetInfoUserService } from './get-info-user-service';

describe('GetInfoUserService', () => {
  let provider: GetInfoUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetInfoUserService],
    }).compile();

    provider = module.get<GetInfoUserService>(GetInfoUserService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
