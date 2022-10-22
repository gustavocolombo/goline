import { Test, TestingModule } from '@nestjs/testing';
import { SoftDeleteUserService } from './soft-delete-user-service';

describe('SoftDeleteUserService', () => {
  let provider: SoftDeleteUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoftDeleteUserService],
    }).compile();

    provider = module.get<SoftDeleteUserService>(SoftDeleteUserService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
