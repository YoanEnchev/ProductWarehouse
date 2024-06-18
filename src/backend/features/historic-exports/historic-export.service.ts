import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoricExport } from './historic-export.entity';

@Injectable()
export class HistoricExportService {
  constructor(
    @InjectRepository(HistoricExport)
    private historicExportsRepository: Repository<HistoricExport>,
  ) {}

  getAll(): Promise<HistoricExport[]|null> {
    return this.historicExportsRepository.find();
  }
}