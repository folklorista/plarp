import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Base } from '@/model/base';
import { environment } from '@environments/environment';

interface CountResponse {
  count: number;
}

interface Inclusion {
  relation: string;
  scope?: Filter;
}

export interface Filter {
  offset?: number;
  limit?: number;
  skip?: number;
  order?: string;
  where?: object;
  fields?: object;
  include?: Inclusion[];
}

@Injectable()
export abstract class BaseService<T extends Base> {
  protected apiUrl: string;
  protected abstract apiUrlModel: string;
  protected relations: string[] = [];

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
    sortColumn?: string,
    sortDirection = 'asc',
    pageNumber = 0,
    pageSize = 10,
    relations?: string[]
  ): Observable<T[]> {
    const rels = relations ? relations : this.relations;
    const filter: Filter = {
      where: this.buildWhere(searchedString, searchedColumns),
      order: this.buildOrder(sortColumn, sortDirection),
      offset: pageNumber * pageSize,
      limit: pageSize,
      include: this.buildIncludeFilter(rels),
    };
    const params = new HttpParams().set('filter', JSON.stringify(filter));

    return this.http.get<T[]>(`${this.apiUrl}/${this.apiUrlModel}`, {
      params,
    });
  }

  create(model: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${this.apiUrlModel}`, model);
  }

  update(id: number, model: T): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${this.apiUrlModel}/${id}`,
      model
    );
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

  private buildOrder(
    sortColumn: string = 'id',
    sortDirection: string = 'asc'
  ): string {
    return sortColumn + ' ' + sortDirection;
  }

  private buildIncludeFilter(rels: string[]): Inclusion[] {
    const result: Inclusion[] = rels.map((rel) => {
      const path = rel.split('.');
      return this.processRelation(path);
    });
    return result;
  }

  private processRelation(path: string[]): Inclusion {
    // ['player.xQuality'] → [{"relation":"player","scope":{"include":[{"relation":"xQuality"}]
    // level 0
    const result: Inclusion = {
      relation: path.shift(),
    };

    // level 1
    if (path.length) {
      result.scope = {
        include: [this.processRelation(path)],
      };
    }
    return result;
  }
}
