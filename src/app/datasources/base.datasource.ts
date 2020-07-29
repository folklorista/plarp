import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Base } from '@/model/base';
import { BaseService } from '@/services/base.service';

export abstract class BaseDataSource<T extends Base> implements DataSource<T> {
  protected subject = new BehaviorSubject<T[]>([]);

  protected loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public count$: Observable<number>;

  constructor(protected apiService: BaseService<T>) {
    this.count$ = this.apiService.count();
  }

  loadData(
    searchedString: string,
    searchedColumns: string[],
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    relations?: string[]
  ) {
    this.loadingSubject.next(true);

    this.count$ = this.apiService.count(searchedString, searchedColumns);

    this.apiService
      .find(
        searchedString,
        searchedColumns,
        sortDirection,
        pageIndex,
        pageSize,
        relations
      )
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((items: T[]) => this.subject.next(items));
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    console.log('Connecting data source');
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subject.complete();
    this.loadingSubject.complete();
  }
}
