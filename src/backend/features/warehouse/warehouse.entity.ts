import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
  
@Entity({name: 'warehouses'})
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true })
  name: string;

  @Column({ type: Number })
  capacity: number;

  @ManyToMany(() => Product, product => product.warehouses)
  products: Product[];
}