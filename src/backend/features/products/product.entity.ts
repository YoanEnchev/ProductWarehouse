import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Warehouse } from '../warehouse/warehouse.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ProductWarehouse } from './product-warehouse.entity';
  
@Entity({name: 'products'})
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field({ nullable: false })
  name: string;

  @Column()
  @Field(() => Int, { nullable: false })
  sizePerUnit: number;

  @Column()
  @Field(() => Int, { nullable: false })
  amountOfUnitsOutsideOfWarehouses: number;

  @Column()
  @Field(() => Boolean, { nullable: false })
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


 @OneToMany(() => ProductWarehouse, productWarehouse => productWarehouse.product_id)
 productWarehouses: ProductWarehouse[];
}