import { BadRequestException, Controller, Param, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehicleDto } from './dto/vehicle.dto';

@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('/licensePlate/:licensePlate')
  @ApiOperation({
    summary: 'Returns Parked Car Data based on number plate input',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched parked vehicle data',
    type: VehicleDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid license plate number',
    type: BadRequestException,
  })
  findMyCar(@Param('licensePlate') licensePlate: string) {
    try {
      return this.vehicleService.findParkedVehicle(licensePlate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
