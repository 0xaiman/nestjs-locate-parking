import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParkingFloor } from './parking-floor.entity';
import { ParkingOperators } from './parking-operator.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeName: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => ParkingFloor, (floor) => floor.store)
  floor: ParkingFloor;

  @ManyToOne(() => ParkingOperators, (parkingOperator) => parkingOperator.store)
  parkingOperator: ParkingOperators;

  //area_id relationship
}
