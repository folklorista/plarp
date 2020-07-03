import { Involvement } from '@/model/involvement';
import { InvolvementService } from '@/services/involvement.service';
import { BaseDataSource } from './base.datasource';

export class InvolvementsDataSource extends BaseDataSource<Involvement> {
  constructor(protected apiService: InvolvementService) {
    super(apiService);
  }
}
