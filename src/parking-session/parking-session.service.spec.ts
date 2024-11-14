import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSessionService } from './parking-session.service';

describe('ParkingSessionService', () => {
  let service: ParkingSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingSessionService],
    }).compile();

    service = module.get<ParkingSessionService>(ParkingSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
