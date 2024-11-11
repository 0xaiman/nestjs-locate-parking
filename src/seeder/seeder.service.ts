import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ParkingBay } from 'src/entities/parking-bay.entity';
import { ParkingFloor } from 'src/entities/parking-floor.entity';
import { ParkingOperators } from 'src/entities/parking-operator.entity';
import { Store } from 'src/entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(ParkingOperators)
    private readonly operatorRepository: Repository<ParkingOperators>,
    @InjectRepository(ParkingFloor)
    private readonly floorRepository: Repository<ParkingFloor>,
    @InjectRepository(ParkingBay)
    private readonly bayRepository: Repository<ParkingBay>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async onModuleInit() {
    await this.seedMalls();
  }

  private async seedMalls() {
    const seedData = ['mall-one.json', 'mall-two.json', 'mall-three.json'];

    const operatorCount = await this.operatorRepository.count();
    if (operatorCount >= seedData.length) {
      console.log('Operators already seeded. Skipping seeding process.');
      return;
    }

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

      for (const floorData of mallData.floors) {
        // Create or find the parking floor
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

        // Seed parking bays for the current floor
        const bayCount = await this.bayRepository.count({
          where: { floor: { id: savedFloor.id } },
        });

        if (bayCount === 0) {
          for (const bayData of floorData.parkingBays) {
            const bay = this.bayRepository.create({
              name: bayData.name,
              occupied: bayData.occupied || false,
              deviceId: bayData.deviceId || null,
              createdAt: new Date(),
              updatedAt: new Date(),
              floor: savedFloor,
              parkingOperator: savedMall,
            });

            await this.bayRepository.save(bay);
            console.log(`Saved bay: ${bay.name} for floor: ${savedFloor.name}`);
          }
        }

        // Seed stores for the floor
        // Seed stores for the current floor
        if (floorData.stores) {
          for (const storeName of floorData.stores) {
            const store = this.storeRepository.create({
              storeName,
              floor: savedFloor,
              parkingOperator: savedMall,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            await this.storeRepository.save(store);
            console.log(
              `Saved store: ${storeName} for floor: ${savedFloor.name}`,
            );
          }
        }
      }
    }
  }

  private loadJSONData(filename: string) {
    const basePath = __dirname.includes('dist')
      ? join(__dirname, '../../src/seeder/seed')
      : join(__dirname, './seed');
    const filepath = join(basePath, filename);
    const jsonData = readFileSync(filepath, 'utf-8');
    return JSON.parse(jsonData);
  }
}
