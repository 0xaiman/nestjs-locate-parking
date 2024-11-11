// vehicle.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class VehicleDto {
  @ApiProperty({
    description: 'The vehicle license plate',
    example: 'ABC123',
  })
  licensePlate: string;

  @ApiProperty({
    description: 'The parking bay where the vehicle is parked',
    example: 'G01',
  })
  parkingBay: string;

  @ApiProperty({
    description: 'The floor on which the vehicle is parked',
    example: 'GROUND',
  })
  parkingFloor: string;

  @ApiProperty({
    description: 'URL to access the vehicle image',
    example: 'http://localhost:3000/static/images/parking-vehicle.png',
  })
  image: string;
}
