import { Module } from '@nestjs/common';
import { ParkingBayService } from './parking-bay.service';
import { ParkingBayController } from './parking-bay.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingBay } from 'src/entities/parking-bay.entity';
import { ParkingFloor } from 'src/entities/parking-floor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingBay, ParkingFloor])],
  exports: [TypeOrmModule],
  providers: [ParkingBayService],
  controllers: [ParkingBayController],
})
export class ParkingBayModule {}
