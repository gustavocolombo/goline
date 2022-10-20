import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserService } from './update-user-service';

describe('UpdateUserService', () => {
  let provider: UpdateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateUserService],
    }).compile();

    provider = module.get<UpdateUserService>(UpdateUserService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
