import { Test, TestingModule } from '@nestjs/testing';
import { EmblemsService } from './emblems.service';

describe('EmblemsService', () => {
  let service: EmblemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmblemsService],
    }).compile();

    service = module.get<EmblemsService>(EmblemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
