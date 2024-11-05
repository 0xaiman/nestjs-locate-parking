import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSession } from 'src/entities/parking-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSession])],
  exports: [TypeOrmModule],
})
export class ParkingSessionModule {}
