import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ParkingBay } from 'src/entities/parking-bay.entity';
import { ParkingBayService } from './parking-bay.service';

@Controller('parking-bay')
export class ParkingBayController {
  constructor(private readonly parkingBayService: ParkingBayService) {}

  @Get('')
  getAll(): Promise<ParkingBay[]> {
    return this.parkingBayService.getAll();
  }

  @Get('/operator/:operatorId')
  async getByOperatorId(
    @Param('operatorId') operatorId: number,
  ): Promise<ParkingBay[]> {
    return this.parkingBayService.getByOperator(operatorId);
  }

  @Get('/operator/:operatorId/floor/:floorId')
  async getByOperatorAndFloor(
    @Param('operatorId') operatorId: number,
    @Param('floorId') floorId: number,
  ): Promise<ParkingBay[]> {
    return this.parkingBayService.getByOperatorAndFloor(operatorId, floorId);
  }

  @Get('/operator/:operatorId/stats')
  async getOperatorStats(@Param('operatorId') operatorId: number) {
    return this.parkingBayService.getOccupancyStats(operatorId);
  }

  @Post('create')
  async createParkingEvent(@Body() parkingBayData: ParkingBay) {
    const createdParkingBay =
      await this.parkingBayService.createParkingEvent(parkingBayData);
    return createdParkingBay;
  }
}
