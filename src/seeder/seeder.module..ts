import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { ParkingOperatorModule } from 'src/parking-operator/parking-operator.module';
import { ParkingOperators } from 'src/entities/parking-operator.entity';
import { ParkingFloor } from 'src/entities/parking-floor.entity';
import { ParkingFloorModule } from 'src/parking-floor/Parking-floor.module';
import { ParkingBay } from 'src/entities/parking-bay.entity';
import { ParkingBayModule } from 'src/parking-bay/parking-bay.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingOperators, ParkingFloor, ParkingBay]),
    ParkingOperatorModule,
    ParkingFloorModule,
    ParkingBayModule,
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
