import { AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { BaseDataSource } from '@/datasources/base.datasource';
import { BaseService } from '@/services/base.service';
import { Base } from './../model/base';

export abstract class BaseTableComponent<T extends Base>
  implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;
  dataSource: BaseDataSource<T>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  abstract displayedColumns: string[];
  abstract searchedColumns: string[];
  abstract routeUrl: string;
  protected relations: string[] = [];

  constructor(protected apiService: BaseService<T>, protected router: Router) {}

  abstract getNewDataSource(): BaseDataSource<T>;

  ngOnInit() {
    this.dataSource = this.getNewDataSource();
    this.dataSource.loadData(
      '',
      this.searchedColumns,
      'asc',
      0,
      10,
      this.relations
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadPage()))
      .subscribe();
  }

  loadPage() {
    this.dataSource.loadData(
      this.input.nativeElement.value,
      this.searchedColumns,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.relations
    );
  }

  goToDetail(row?: Base): void {
    this.router.navigate([this.routeUrl, row ? row.id : 'new']);
  }
}
