import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParkingOperators } from "src/entities/parking-operator.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ParkingOperators])],
  exports: [TypeOrmModule],
})
export class ParkingOperatorModule {}
