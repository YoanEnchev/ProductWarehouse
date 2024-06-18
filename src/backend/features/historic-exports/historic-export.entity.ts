import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Warehouse } from '../warehouse/warehouse.entity';
import { Product } from '../products/product.entity';
  
@Entity({name: 'historic_exports'})
export class HistoricExport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Warehouse, warehouse => warehouse.id, {nullable: true})
  fromWarehouse: Warehouse;

  @ManyToOne(() => Warehouse, warehouse => warehouse.id, {nullable: true})
  toWarehouse: Warehouse;

  @ManyToOne(() => Product, product => product.id)
  product: Product;

  @Column()
  units: number;  

  @Column({ type: 'timestamptz' }) // 'timestamptz' for PostgreSQL, 'datetime' for other SQL databases
  actionDate: Date;
}