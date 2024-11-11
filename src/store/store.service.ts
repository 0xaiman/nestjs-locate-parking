import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async getParkingData(storeId: number): Promise<any> {
    // First, find the store by its ID to determine the floor associated with it
    const store = await this.storeRepository.findOne({
      where: {
        id: storeId,
      },
      relations: ['floor', 'floor.parkingBays', 'parkingOperator'], // Include floor and parking bays related to the store
    });

    if (!store) {
      throw new Error(`Store with ID ${storeId} not found`);
    }

    // The store's floor information is now available
    const floor = store.floor;

    // Return the floor along with its parking bays and operator details
    return {
      floor: floor.name,
      parkingBays: floor.parkingBays,
      parkingOperator: store.parkingOperator.name,
    };
  }
}
