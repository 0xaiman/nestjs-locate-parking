import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParkingSession } from './parking-session.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  license_plate: string;

  @Column({ nullable: false })
  vehicle_type: string;

  @Column({ nullable: false })
  vehicle_color: string;

  @Column({ nullable: false })
  vehicle_brand: string;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: false })
  updated_at: Date;

  @OneToOne(() => ParkingSession, (session) => session.vehicle)
  session: ParkingSession;
}
