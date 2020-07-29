import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { AcquaintancesDataSource } from '@/datasources/acquaintance.datasource';
import { Base } from './../model/base';
import { AcquaintanceService } from './../services/acquaintance.service';

@Component({
  selector: 'app-acquaintance-table',
  templateUrl: './acquaintance-table.component.html',
  styleUrls: ['./acquaintance-table.component.scss'],
})
export class AcquaintanceTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;
  dataSource: AcquaintancesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['_actions', 'idCharacter', 'idObject', 'description'];
  searchedColumns = ['idCharacter', 'idObject', 'description'];
  routeUrl = 'acquaintance';

  constructor(
    private apiService: AcquaintanceService,
    protected router: Router
  ) {}

  ngOnInit() {
    this.dataSource = new AcquaintancesDataSource(this.apiService);
    this.dataSource.loadData('', this.searchedColumns, 'asc', 0, 10, [
      'character',
      'object',
    ]);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadAcquaintancesPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadAcquaintancesPage()))
      .subscribe();
  }

  loadAcquaintancesPage() {
    this.dataSource.loadData(
      this.input.nativeElement.value,
      this.searchedColumns,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  goToDetail(row?: Base): void {
    this.router.navigate([this.routeUrl, row ? row.id : 'new']);
  }
}
