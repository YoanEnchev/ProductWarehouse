import { Int, Args, Parent, Query, Mutation, Resolver, ResolveField } from '@nestjs/graphql';
import { Warehouse } from './warehouse.entity';
import { WarehouseService } from './warehouse.service';

@Resolver(of => Warehouse)
export class WarehouseResolver {
  constructor(
    private readonly warehouseService: WarehouseService,
  ) { }

  @Query(returns => [Warehouse], { name: 'AllWarehouses', nullable: false })
  async getAllWarehouses(): Promise<Warehouse[]> {
    return await this.warehouseService.findAll();
  }

  @Query(returns => Warehouse, { name: 'WarehouseDetails', nullable: false })
  async getWarehouseDetails(@Args({ name: 'id', type: () => Int }) id: number): Promise<Warehouse> {
    return await this.warehouseService.findByID(id);
  }
}