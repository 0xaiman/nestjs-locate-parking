import { Test, TestingModule } from '@nestjs/testing';
import { ParkingBayController } from './parking-bay.controller';

describe('ParkingBayController', () => {
  let controller: ParkingBayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingBayController],
    }).compile();

    controller = module.get<ParkingBayController>(ParkingBayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
