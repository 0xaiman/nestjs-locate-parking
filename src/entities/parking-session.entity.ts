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
  event_time: Date;

  @Column()
  event_type: string;

  @Column()
  duration: number; // seconds

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  image_path: string;
}
