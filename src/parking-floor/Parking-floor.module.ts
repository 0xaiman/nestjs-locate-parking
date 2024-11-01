import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingFloor } from 'src/entities/parking-floor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingFloor])],
  exports: [TypeOrmModule],
})
export class ParkingFloorModule {}
