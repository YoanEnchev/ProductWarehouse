import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from '../warehouse/warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  getExportableWarehousesForProductUnit(productId: string, warehouseId): Promise<Warehouse[]|null> {
    return this.warehouseRepository.find({
      where: {},
    });
  }
}