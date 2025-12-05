import { Test, TestingModule } from '@nestjs/testing';
import { DestiniesService } from './destinies.service';

describe('DestiniesService', () => {
  let service: DestiniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DestiniesService],
    }).compile();

    service = module.get<DestiniesService>(DestiniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
