import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Tail } from '@/model/tail';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TailService extends BaseService<Tail> {
  apiUrl = '/api/tails';
  constructor(protected http: HttpClient) {
    super(http);
  }
}
