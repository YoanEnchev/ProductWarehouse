import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
  
@Entity({ name: 'product_warehouses' })
export class ProductWarehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  units: number;
}
  