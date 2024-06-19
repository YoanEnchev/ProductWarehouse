import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './warehouse.entity';
import { WarehouseResolver } from './warehouse.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Warehouse])],
  controllers: [],
  providers: [WarehouseService, WarehouseResolver],
  exports: [WarehouseService, WarehouseResolver]
})
export class WarehouseModule {}
