import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { CharactersDataSource } from '@/datasources/character.datasource';
import { Base } from './../model/base';
import { CharacterService } from './../services/character.service';

@Component({
  selector: 'app-character-table',
  templateUrl: './character-table.component.html',
  styleUrls: ['./character-table.component.scss'],
})
export class CharacterTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;
  dataSource: CharactersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['_actions', 'name', 'summaryShort'];
  searchedColumns = ['name', 'summaryShort'];
  routeUrl = 'character';

  constructor(private apiService: CharacterService, protected router: Router) {}

  ngOnInit() {
    this.dataSource = new CharactersDataSource(this.apiService);
    this.dataSource.loadData('', this.searchedColumns, 'asc', 0, 10);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadCharactersPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCharactersPage()))
      .subscribe();
  }

  loadCharactersPage() {
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
