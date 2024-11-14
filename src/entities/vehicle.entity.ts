import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParkingSession } from './parking-session.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  licensePlate: string;

  @Column({ nullable: false })
  vehicleType: string;

  @Column({ nullable: false })
  vehicleColor: string;

  @Column({ nullable: false })
  vehicleBrand: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @OneToMany(() => ParkingSession, (session) => session.vehicle)
  session: ParkingSession[];
}
