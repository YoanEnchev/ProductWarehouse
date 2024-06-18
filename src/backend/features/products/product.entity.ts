import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Warehouse } from '../warehouse/warehouse.entity';
  
@Entity({name: 'products'})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  sizePerUnit: number;

  @Column()
  amountOfUnitsOutsideOfWarehouses: number;

  @Column()
  isHazardous: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Warehouse, warehouse => warehouse.products)
  @JoinTable({
    name: 'product_warehouses',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'warehouse_id',
      referencedColumnName: 'id'
    }
  })
  warehouses: Warehouse[];
}