import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '@/model/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  apiUrl = '/api/users';
  constructor(protected http: HttpClient) {
    super(http);
  }
}
