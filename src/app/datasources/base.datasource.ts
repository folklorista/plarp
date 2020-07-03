import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

import { Base } from '@/model/base';
import { BaseService } from '@/services/base.service';

export abstract class BaseDataSource<T extends Base> implements DataSource<T> {
  protected subject = new BehaviorSubject<T[]>([]);

  protected loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(protected apiService: BaseService<T>) {}

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    console.log('Connecting data source');
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subject.complete();
    this.loadingSubject.complete();
  }
}
