import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity();
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  store_name: string;

  //area_id relationship
}
