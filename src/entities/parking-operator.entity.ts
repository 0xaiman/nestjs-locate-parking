import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ParkingFloor } from './parking-floor.entity';
import { ParkingBay } from './parking-bay.entity';

@Entity()
export class ParkingOperators {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => ParkingFloor, (floor) => floor.parkingOperator)
  floor: ParkingFloor[];

  @OneToMany(() => ParkingBay, (parkingBay) => parkingBay.parkingOperator)
  parkingBays: ParkingBay[];
}
