import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ParkingBay } from 'src/entities/parking-bay.entity';
import { ParkingBayService } from './parking-bay.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { StaticTokenAuthGuard } from 'src/guards/static-token-auth/static-token-auth.guard';

@UseGuards(StaticTokenAuthGuard)
@Controller('parking-bay')
export class ParkingBayController {
  constructor(private readonly parkingBayService: ParkingBayService) {}

  @Get('')
  getAll(): Promise<ParkingBay[]> {
    return this.parkingBayService.getAll(); //gets all bay data from all operators
  }

  @Get('/operator/:operatorId')
  async getByOperatorId(
    @Param('operatorId') operatorId: number,
  ): Promise<ParkingBay[]> {
    return this.parkingBayService.getByOperator(operatorId); //gets all bay data by operator id
  }

  @Get('/operator/:operatorId/floor/:floorId')
  async getByOperatorAndFloor(
    @Param('operatorId') operatorId: number,
    @Param('floorId') floorId: number,
  ): Promise<ParkingBay[]> {
    return this.parkingBayService.getByOperatorAndFloor(operatorId, floorId); // gets bay data by operator Id and floor id i.e bay data by floor
  }

  @Get('/operator/:operatorId/stats')
  async getOperatorStats(@Param('operatorId') operatorId: number) {
    return this.parkingBayService.getOccupancyStats(operatorId); // total occupancy of each floor by operator id
  }

  @Post('create')
  async createParkingEvent(@Body() parkingBayData: ParkingBay) {
    const createdParkingBay =
      await this.parkingBayService.createParkingEvent(parkingBayData); //endpoint to create new parking event
    return createdParkingBay;
  }
}
