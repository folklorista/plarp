import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Player } from '@/model/player';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService extends BaseService<Player> {
  apiUrlModel = 'players';
  constructor(protected http: HttpClient) {
    super(http);
  }
}
