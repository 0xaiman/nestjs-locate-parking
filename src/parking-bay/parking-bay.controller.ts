import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ParkingBay } from 'src/entities/parking-bay.entity';
import { ParkingBayService } from './parking-bay.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { StaticTokenAuthGuard } from 'src/guards/static-token-auth/static-token-auth.guard';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Parking Bay')
@Controller('parking-bay')
export class ParkingBayController {
  constructor(private readonly parkingBayService: ParkingBayService) {}

  @Get('')
  @ApiOperation({
    summary: 'Retrieve all parking bays data',
    description: 'Fetches all parking bay data from all operators.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all parking bays.',
    type: [ParkingBay],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  getAll(): Promise<ParkingBay[]> {
    return this.parkingBayService.getAll();
  }

  @Get('/operator/:operatorId')
  @ApiOperation({
    summary: 'Retrieve parking bays by operator ID',
    description:
      'Fetches parking bay data for a specific operator using operator ID.',
  })
  @ApiParam({
    name: 'operatorId',
    description: 'The ID of the operator to fetch parking bays for.',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved parking bays for the operator.',
    type: [ParkingBay],
  })
  @ApiResponse({
    status: 404,
    description: 'Operator not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getByOperatorId(
    @Param('operatorId') operatorId: number,
  ): Promise<ParkingBay[]> {
    return this.parkingBayService.getByOperator(operatorId);
  }

  @Get('/operator/:operatorId/floor/:floorId')
  @ApiOperation({
    summary: 'Retrieve parking bays by operator and floor ID',
    description:
      'Fetches parking bay data for a specific operator and floor using operator and floor IDs.',
  })
  @ApiParam({
    name: 'operatorId',
    description: 'The ID of the operator.',
    required: true,
    type: Number,
  })
  @ApiParam({
    name: 'floorId',
    description: 'The ID of the floor.',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully retrieved parking bays for the operator and floor.',
    type: [ParkingBay],
  })
  @ApiResponse({
    status: 404,
    description: 'Operator or floor not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getByOperatorAndFloor(
    @Param('operatorId') operatorId: number,
    @Param('floorId') floorId: number,
  ): Promise<ParkingBay[]> {
    return this.parkingBayService.getByOperatorAndFloor(operatorId, floorId);
  }

  @Get('/operator/:operatorId/stats')
  @ApiOperation({
    summary: 'Retrieve parking occupancy stats by operator ID',
    description:
      'Fetches the occupancy stats for each parking bay floor associated with a specific operator.',
  })
  @ApiParam({
    name: 'operatorId',
    description: 'The ID of the operator to fetch occupancy stats for.',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved occupancy stats for the operator.',
  })
  @ApiResponse({
    status: 404,
    description: 'Operator not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
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
