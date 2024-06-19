import { InputType, Field, Int } from '@nestjs/graphql';
import { Length, IsInt, Min, Max, IsBoolean, MaxLength, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProductDto {
  
  @Field()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(10)
  sizePerUnit: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(1000)
  amountOfUnitsOutsideOfWarehouses: number;

  @Field(() => Boolean)
  @IsBoolean()
  isHazardous: boolean;
}
