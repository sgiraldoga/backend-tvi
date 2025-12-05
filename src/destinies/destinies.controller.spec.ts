import { Test, TestingModule } from '@nestjs/testing';
import { DestiniesController } from './destinies.controller';
import { DestiniesService } from './destinies.service';

describe('DestiniesController', () => {
  let controller: DestiniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestiniesController],
      providers: [DestiniesService],
    }).compile();

    controller = module.get<DestiniesController>(DestiniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
