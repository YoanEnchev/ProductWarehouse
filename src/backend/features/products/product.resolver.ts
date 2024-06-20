import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductDto') createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Query(returns => [Product!], { name: 'AllProducts', nullable: false })
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.findAll();
  }
}
