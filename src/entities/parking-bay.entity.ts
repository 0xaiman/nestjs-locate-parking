import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParkingOperators } from './parking-operator.entity';
import { ParkingFloor } from './parking-floor.entity';
import { ParkingSession } from './parking-session.entity';
import { Device } from './device.entity';

@Entity()
export class ParkingBay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  occupied: boolean;

  @Column({ nullable: true })
  deviceId: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => ParkingFloor, (floor) => floor.parkingBays)
  floor: ParkingFloor;

  @ManyToOne(
    () => ParkingOperators,
    (parkingOperator) => parkingOperator.parkingBays,
  )
  parkingOperator: ParkingOperators;

  @OneToOne(() => ParkingSession, (session) => session.bay)
  session: ParkingSession; // Ensure this matches with ParkingSession

  @ManyToOne(() => Device, (device) => device.bay)
  device: Device;
}
