import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './warehouse.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Warehouse])],
  controllers: [],
  providers: [WarehouseService],
  exports: [WarehouseService]
})
export class WarehouseModule {}
