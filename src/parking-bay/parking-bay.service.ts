import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingBay } from 'src/entities/parking-bay.entity';
import { ParkingFloor } from 'src/entities/parking-floor.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ParkingBayService {
  constructor(
    @InjectRepository(ParkingBay)
    private parkingBayRepository: Repository<ParkingBay>,
    @InjectRepository(ParkingFloor)
    private floorRepository: Repository<ParkingFloor>,
  ) {}

  async getAll(): Promise<ParkingBay[]> {
    return await this.parkingBayRepository.find();
  }

  async getByOperator(operatorId: number): Promise<ParkingBay[]> {
    return await this.parkingBayRepository.find({
      where: { parkingOperator: { id: operatorId } },
    });
  }

  async getByOperatorAndFloor(
    operatorId: number,
    floorId: number,
  ): Promise<any> {
    const parkingBays = await this.parkingBayRepository.find({
      where: { parkingOperator: { id: operatorId }, floor: { id: floorId } },
      relations: ['floor', 'parkingOperator'],
    });

    return parkingBays.map((bay) => ({
      id: bay.id,
      name: bay.name,
      occupied: bay.occupied,
      device_id: bay.deviceId,
      createdAt: bay.createdAt,
      updatedAt: bay.updatedAt,
      floorId: bay.floor.id,
      floorName: bay.floor.name,
      operatorName: bay.parkingOperator.name,
    }));
  }

  async getOccupancyStats(operatorId: number) {
    const parkingBays = await this.parkingBayRepository.find({
      where: { parkingOperator: { id: operatorId } },
      relations: ['floor'],
    });

    const floorStats: Record<
      string,
      { occupied: number; total: number; floorId: number }
    > = {};

    // Fetch floors associated with the operator
    const floors = await this.floorRepository.find({
      where: { parkingOperator: { id: operatorId } },
    });

    // Initialization
    floors.forEach((floor) => {
      floorStats[floor.name] = { occupied: 0, total: 0, floorId: floor.id };
    });

    // Calculate occupancy stats
    parkingBays.forEach((bay) => {
      if (bay.floor) {
        const floorName = bay.floor.name;
        const isOccupied = bay.occupied ? 1 : 0;

        if (floorStats[floorName]) {
          floorStats[floorName].total += 1;
          floorStats[floorName].occupied += isOccupied;
        } else {
          console.warn(
            `Parking bay ${bay.id} does not have an associated floor.`,
          );
        }
      }
    });

    // Transform to desired response format
    const occupancyStats = Object.entries(floorStats).map(
      ([floorName, stats]) => {
        const unoccupied = stats.total - stats.occupied;
        return {
          floorId: stats.floorId,
          floorName: floorName.trim(), // Remove any extra spaces
          unoccupied: `${unoccupied}/${stats.total}`,
        };
      },
    );

    return occupancyStats; // Return the transformed array
  }
  async createParkingEvent(parkingBayData: ParkingBay): Promise<ParkingBay> {
    const parkingBay = this.parkingBayRepository.create(parkingBayData);
    return this.parkingBayRepository.save(parkingBay);
  }
}
