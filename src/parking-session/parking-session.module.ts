import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSession } from 'src/entities/parking-session.entity';
import { ParkingSessionController } from './parking-session.controller';
import { ParkingSessionService } from './parking-session.service';
import { Vehicle } from 'src/entities/vehicle.entity';
import { ParkingFloor } from 'src/entities/parking-floor.entity';
import { ParkingOperators } from 'src/entities/parking-operator.entity';
import { ParkingBay } from 'src/entities/parking-bay.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ParkingSession,
      Vehicle,
      ParkingFloor,
      ParkingOperators,
      ParkingBay,
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [ParkingSessionController],
  providers: [ParkingSessionService],
})
export class ParkingSessionModule {}
