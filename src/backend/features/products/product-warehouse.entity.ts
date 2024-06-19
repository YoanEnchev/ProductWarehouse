import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
} from 'typeorm';
import { Warehouse } from '../warehouse/warehouse.entity';
import { Product } from './product.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
  
@Entity({ name: 'product_warehouses' })

@ObjectType()
export class ProductWarehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field(() => Int, { nullable: false })
  units: number;

  @PrimaryColumn()
  @Field(() => Int, { nullable: false })
  warehouse_id: number;

  @PrimaryColumn()
  @Field(() => Int, { nullable: false })
  product_id: number;


  @ManyToOne(() => Warehouse, warehouse => warehouse.productWarehouses)
  @JoinColumn({ name: 'warehouse_id' })
  @Field(() => Warehouse)
  warehouse: Warehouse;

  @ManyToOne(() => Product, product => product.productWarehouses)
  @JoinColumn({ name: 'product_id' })
  @Field(() => Product)
  product: Product;
}
  