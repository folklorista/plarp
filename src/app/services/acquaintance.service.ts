import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Acquaintance } from '@/model/acquaintance';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AcquaintanceService extends BaseService<Acquaintance> {
  apiUrlModel = 'acquaintances';
  constructor(protected http: HttpClient) {
    super(http);
  }
}
