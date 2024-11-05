import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAuth } from './user-auth.entity';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  phoneNo: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToOne(() => UserAuth)
  @JoinColumn()
  password: UserAuth;
}
