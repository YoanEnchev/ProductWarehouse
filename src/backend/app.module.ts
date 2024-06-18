import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../../ormconfig';
import { AppController } from './app.controller';
import { WarehouseModule } from './features/warehouse/warehouse.module';
import { ProductModule } from './features/products/product.module';
import { HistoricExportModule } from './features/historic-exports/historic-export.module';

@Module({
  imports: [
    WarehouseModule,
    ProductModule,
    HistoricExportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
