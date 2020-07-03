import { Acquaintance } from '@/model/acquaintance';
import { AcquaintanceService } from '@/services/acquaintance.service';
import { BaseDataSource } from './base.datasource';

export class AcquaintancesDataSource extends BaseDataSource<Acquaintance> {
  constructor(protected apiService: AcquaintanceService) {
    super(apiService);
  }
}
