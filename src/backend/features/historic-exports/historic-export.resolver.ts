import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { HistoricExportService } from './historic-export.service';
import { HistoricExport } from './historic-export.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Resolver(() => HistoricExport)
export class HistoricExportResolver {
  constructor(private readonly historicExportService: HistoricExportService) {}

  @Mutation(() => HistoricExport)
  async createProduct(
    @Args('createExport') createProductDto: CreateProductDto,
  ): Promise<HistoricExport> {
    return this.historicExportService.create(createProductDto);
  }
}
