import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductWarehouse } from './product-warehouse.entity';
import { ProductResolver } from './product.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([ProductWarehouse, Product])],
  controllers: [],
  providers: [ProductService, ProductResolver],
  exports: [ProductService, ProductResolver]
})
export class ProductModule {}
