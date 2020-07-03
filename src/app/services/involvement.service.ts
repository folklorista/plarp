import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Involvement } from '@/model/involvement';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class InvolvementService extends BaseService<Involvement> {
  apiUrl = '/api/involvements';
  constructor(protected http: HttpClient) {
    super(http);
  }
}
