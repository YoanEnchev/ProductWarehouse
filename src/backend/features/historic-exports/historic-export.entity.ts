import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Warehouse } from '../warehouse/warehouse.entity';
import { Product } from '../products/product.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
  
@Entity({name: 'historic_exports'})
@ObjectType()
export class HistoricExport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Warehouse, warehouse => warehouse.id, {nullable: true})
  @Field(type => Warehouse, { nullable: false })
  fromWarehouse: Warehouse;

  @ManyToOne(() => Warehouse, warehouse => warehouse.id, {nullable: true})
  @Field(type => Warehouse, { nullable: false })
  toWarehouse: Warehouse;

  @ManyToOne(() => Product, product => product.id)
  @Field(type => Product, { nullable: false })
  product: Product;

  @Column()
  @Field(() => Int, { nullable: false })
  units: number;  

  @Column({ type: 'timestamptz' }) // 'timestamptz' for PostgreSQL, 'datetime' for other SQL databases
  @Field(() => Date)
  actionDate: Date;
}