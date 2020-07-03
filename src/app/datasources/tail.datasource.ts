import { Tail } from '@/model/tail';
import { TailService } from '@/services/tail.service';
import { BaseDataSource } from './base.datasource';

export class TailsDataSource extends BaseDataSource<Tail> {
  constructor(protected apiService: TailService) {
    super(apiService);
  }
}
