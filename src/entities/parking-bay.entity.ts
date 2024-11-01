import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParkingOperators } from './parking-operator.entity';
import { ParkingFloor } from './parking-floor.entity';

@Entity()
export class ParkingBay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  occupied: boolean;

  @Column({ nullable: true })
  device_id: string;

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
}
