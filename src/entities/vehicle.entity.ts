import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: false })
  updatedAt: Date;

  @OneToOne(() => ParkingSession, (session) => session.vehicle)
  session: ParkingSession;
}
