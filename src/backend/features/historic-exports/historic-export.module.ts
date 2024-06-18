import { Module } from '@nestjs/common';
import { HistoricExportService } from './historic-export.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricExport } from './historic-export.entity';


@Module({
  imports: [TypeOrmModule.forFeature([HistoricExport])],
  controllers: [],
  providers: [HistoricExportService],
  exports: [HistoricExportService]
})
export class HistoricExportModule {}
