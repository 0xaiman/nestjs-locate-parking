import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ParkingBay } from 'src/entities/parking-bay.entity';
import { ParkingFloor } from 'src/entities/parking-floor.entity';
import { ParkingOperators } from 'src/entities/parking-operator.entity';
import { Repository } from 'typeorm';

// TODO: fix seeding logic
@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(ParkingOperators)
    private readonly operatorRepository: Repository<ParkingOperators>,
    @InjectRepository(ParkingFloor)
    private readonly floorRepository: Repository<ParkingFloor>,
    @InjectRepository(ParkingBay)
    private readonly bayRepository: Repository<ParkingBay>,
  ) {}

  async onModuleInit() {
    await this.seedMalls();
  }

  private async seedMalls() {
    const seedData = ['mall-one.json', 'mall-two.json', 'mall-three.json'];

    // Check if operators already exist in the database
    const operatorCount = await this.operatorRepository.count();
    if (operatorCount >= seedData.length) {
      console.log('Operators already seeded. Skipping seeding process.');
      return;
    }

    // Loop through each mall file in the seed data
    for (const mallFile of seedData) {
      const mallData = this.loadJSONData(mallFile);

      // Create and save the parking operator (mall)
      const mall = this.operatorRepository.create({
        name: mallData.mallName,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const savedMall = await this.operatorRepository.save(mall);
      console.log(`Saved mall: ${savedMall.name}`);

      // Iterate through the floors in the JSON data
      for (const floorData of mallData.floors) {
        // Check if the floor already exists for this operator
        const existingFloor = await this.floorRepository.findOne({
          where: {
            name: floorData.name,
            parkingOperator: { id: savedMall.id },
          },
        });

        let savedFloor;
        if (existingFloor) {
          console.log(
            `Floor ${existingFloor.name} already exists for mall ${savedMall.name}. Skipping floor seeding.`,
          );
          savedFloor = existingFloor;
        } else {
          const floor = this.floorRepository.create({
            name: floorData.name,
            parkingOperator: savedMall,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          savedFloor = await this.floorRepository.save(floor);
          console.log(`Saved floor: ${savedFloor.name}`);
        }

        // Check if bays already exist for this floor
        const bayCount = await this.bayRepository.count({
          where: { floor: { id: savedFloor.id } },
        });

        if (bayCount > 0) {
          console.log(
            `Parking bays already exist for floor ID ${savedFloor.id}. Skipping bay seeding.`,
          );
          continue; // Move to the next floor if bays already exist
        }

        // Seed bays for the current floor
        for (const bayData of floorData.parkingBays) {
          const bay = this.bayRepository.create({
            name: bayData.name,
            occupied: bayData.occupied || false, // Default to false if not provided
            deviceId: bayData.deviceId || null, // Default to null if not provided
            createdAt: new Date(),
            updatedAt: new Date(),
            floor: savedFloor, // Set the relation to the floor
            parkingOperator: savedMall,
          });

          await this.bayRepository.save(bay); // Save the bay to the database
          console.log(`Saved bay: ${bay.name} for floor: ${savedFloor.name}`);
        }
      }
    }
  }

  // Utility function to load JSON data
  private loadJSONData(filename: string) {
    const basePath = __dirname.includes('dist')
      ? join(__dirname, '../../src/seeder/seed')
      : join(__dirname, './seed');
    const filepath = join(basePath, filename);
    const jsonData = readFileSync(filepath, 'utf-8');
    return JSON.parse(jsonData);
  }
}
