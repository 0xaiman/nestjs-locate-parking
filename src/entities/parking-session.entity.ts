import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { ParkingBay } from './parking-bay.entity';

@Entity()
export class ParkingSession {
  @PrimaryGeneratedColumn()
  event_id: number;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.session)
  @JoinColumn()
  vehicle: Vehicle;

  @OneToOne(() => ParkingBay, (bay) => bay.session)
  @JoinColumn()
  bay: ParkingBay; // Ensure this matches with ParkingBay

  @Column()
  eventTime: Date;

  @Column()
  eventType: string;

  @Column()
  duration: number; // seconds

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  imagePath: string;
}
