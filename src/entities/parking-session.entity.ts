import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { ParkingBay } from './parking-bay.entity';

@Entity()
export class ParkingSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.session)
  @JoinColumn()
  vehicle: Vehicle;

  @ManyToOne(() => ParkingBay, (bay) => bay.session)
  @JoinColumn()
  bay: ParkingBay; // Ensure this matches with ParkingBay

  @Column()
  eventTime: Date;

  @Column()
  occupied: boolean;

  @Column()
  duration: number; // seconds

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  imagePath: string;
}
