import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Character } from '@/model/character';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends BaseService<Character> {
  apiUrl = '/api/characters';
  constructor(protected http: HttpClient) {
    super(http);
  }
}
