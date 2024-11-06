import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParkingBay } from './parking-bay.entity';
import { ParkingFloor } from './parking-floor.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  deviceName: string;

  @Column({ nullable: false })
  channel: number;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: false })
  lastHeartbeat: Date;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: false })
  updatedAt: Date;

  //paking bay relationship
  @OneToMany(() => ParkingBay, (bay) => bay.device)
  bay: ParkingBay[];

  // parking floor relationship
  @ManyToOne(() => ParkingFloor, (floor) => floor.device)
  floor: ParkingFloor;
}
