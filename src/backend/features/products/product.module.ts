import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductWarehouse } from './product-warehouse.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ProductWarehouse, Product])],
  controllers: [],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
