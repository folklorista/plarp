import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Base } from '@/model/base';

interface CountResponse {
  count: number;
}

@Injectable()
export abstract class BaseService<T extends Base> {
  protected abstract apiUrl: string;

  constructor(protected http: HttpClient) {}

  findById(courseId: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${courseId}`);
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  count(): Observable<number> {
    return this.http
      .get<CountResponse>(this.apiUrl)
      .pipe(map((res) => res.count));
  }
}
