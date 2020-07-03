import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Base } from '@/model/base';
import { environment } from '@environments/environment';

interface CountResponse {
  count: number;
}

export interface Filter {
  offset?: number;
  limit?: number;
  skip?: number;
  order?: string[];
  where?: object;
  fields?: object;
}

@Injectable()
export abstract class BaseService<T extends Base> {
  protected apiUrl: string;
  protected abstract apiUrlModel: string;

  constructor(protected http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.apiUrlModel}/${id}`);
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.apiUrlModel}`);
  }

  find(
    searchedString?: string,
    searchedColumns?: string[],
    sortDirection = 'asc',
    pageNumber = 0,
    pageSize = 10
  ): Observable<T[]> {
    const filter: Filter = {
      where: this.buildWhere(searchedString, searchedColumns),
      order: this.buildOrder(sortDirection),
      offset: pageNumber * pageSize,
      limit: pageSize,
    };

    const params = new HttpParams().set('filter', JSON.stringify(filter));

    return this.http.get<T[]>(`${this.apiUrl}/${this.apiUrlModel}`, {
      params,
    });
  }

  count(
    searchedString?: string,
    searchedColumns?: string[]
  ): Observable<number> {
    const params = new HttpParams().set(
      'where',
      JSON.stringify(this.buildWhere(searchedString, searchedColumns))
    );

    return this.http
      .get<CountResponse>(`${this.apiUrl}/${this.apiUrlModel}/count`, {
        params,
      })
      .pipe(map((res) => res.count));
  }

  private buildWhere(
    searchedString?: string,
    searchedColumns?: string[]
  ): object {
    let result = {};
    if (searchedString) {
      const or = [];
      searchedColumns.forEach((column) => {
        const orItem = {};
        orItem[column] = {
          ilike: '%' + searchedString + '%',
        };
        or.push(orItem);
      });
      result = { or };
    }

    return result;
  }

  private buildOrder(sortDirection: string): string[] {
    // TODO: sort column with direction
    return null;
  }
}