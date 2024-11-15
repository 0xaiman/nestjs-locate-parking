import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParkingOperators } from './parking-operator.entity';
import { ParkingBay } from './parking-bay.entity';
import { Device } from './device.entity';
import { Store } from './store.entity';

@Entity()
export class ParkingFloor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => ParkingOperators, (parkingOperator) => parkingOperator.floor)
  parkingOperator: ParkingOperators;

  @OneToMany(() => ParkingBay, (parkingBay) => parkingBay.floor)
  parkingBays: ParkingBay[];

  @OneToMany(() => Store, (store) => store.floor)
  store: Store[];

  @OneToMany(() => Device, (device) => device.floor)
  device: Device[];
}
