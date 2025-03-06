import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreproducto: string;

  @Column()
  detalle: string;

  @Column()
  precio: number;

  @Column()
  imagen: string;
}
