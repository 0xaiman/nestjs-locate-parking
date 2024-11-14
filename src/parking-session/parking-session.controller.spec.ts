import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSessionController } from './parking-session.controller';

describe('ParkingSessionController', () => {
  let controller: ParkingSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSessionController],
    }).compile();

    controller = module.get<ParkingSessionController>(ParkingSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
