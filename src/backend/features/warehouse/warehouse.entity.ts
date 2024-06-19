import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ProductWarehouse } from '../products/product-warehouse.entity';
import { HistoricExport } from '../historic-exports/historic-export.entity';
  
@Entity({name: 'warehouses'})
@ObjectType()
export class Warehouse {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: String, unique: true })
  @Field({ nullable: false })
  name: string;

  @Column({ type: Number })
  @Field(() => Int, { nullable: false })
  capacity: number;

  @ManyToMany(() => Product, product => product.warehouses)
  @Field(type => [ Product ], { nullable: false })
  products: Product[];

  @OneToMany(() => ProductWarehouse, productWarehouse => productWarehouse.warehouse_id)
  @Field(type => [ProductWarehouse], { nullable: false })
  productWarehouses: ProductWarehouse[];

  @OneToMany(() => HistoricExport, historicExport => historicExport.fromWarehouse)
  @Field(type => [HistoricExport!], { nullable: true })
  exports: HistoricExport[];

  @OneToMany(() => HistoricExport, historicExport => historicExport.toWarehouse)
  @Field(type => [HistoricExport!], { nullable: true })
  imports: HistoricExport[];
  

  @Field(type => Int, { nullable: true })
  get freeCapacityRemaining(): number {
    console.log('>>>>>>>>>freeCapacityRemaining>>>>>>>>>');
    return this.capacity - (this.productWarehouses ? this.productWarehouses.length : 0);
  }
}