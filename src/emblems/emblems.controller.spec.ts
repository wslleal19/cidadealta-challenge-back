import { Test, TestingModule } from '@nestjs/testing';
import { EmblemsController } from './emblems.controller';
import { EmblemsService } from './emblems.service';

describe('EmblemsController', () => {
  let controller: EmblemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmblemsController],
      providers: [EmblemsService],
    }).compile();

    controller = module.get<EmblemsController>(EmblemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
