import { Controller, Param, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}
  @Post('/licensePlate/:licensePlate')
  findMyCar(@Param('licensePlate') licensePlate: string) {
    return this.vehicleService.findParkedVehicle(licensePlate);
  }
}
