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

  findAll(): Promise<Warehouse[]|null> {
    return this.warehouseRepository.find();
  }

  findByID(id: number): Promise<Warehouse|null> {
    return this.warehouseRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  getExportableWarehousesForProductUnit(productId: string, warehouseId): Promise<Warehouse[]|null> {
    return this.warehouseRepository.find({
      where: {},
    });
  }
}