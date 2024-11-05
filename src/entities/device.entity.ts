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
  device_name: string;

  @Column({ nullable: false })
  channel: number;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: false })
  last_hearbeat: Date;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: false })
  updated_at: Date;

  //paking bay relationship
  @OneToMany(() => ParkingBay, (bay) => bay.device)
  bay: ParkingBay[];

  // parking floor relationship
  @ManyToOne(() => ParkingFloor, (floor) => floor.device)
  floor: ParkingFloor;
}
