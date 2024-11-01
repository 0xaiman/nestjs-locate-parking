import { Test, TestingModule } from '@nestjs/testing';
import { ParkingBayService } from './parking-bay.service';

describe('ParkingBayService', () => {
  let service: ParkingBayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingBayService],
    }).compile();

    service = module.get<ParkingBayService>(ParkingBayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
