import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordService } from './reset-password-service';

describe('RecoverPasswordService', () => {
  let provider: ResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetPasswordService],
    }).compile();

    provider = module.get<ResetPasswordService>(ResetPasswordService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
