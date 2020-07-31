import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseTableComponent } from '@/base/base-table.component';
import { TailsDataSource } from '@/datasources/tail.datasource';
import { Tail } from '@/model/tail';
import { TailService } from '@/services/tail.service';

@Component({
  selector: 'app-tail-table',
  templateUrl: './tail-table.component.html',
  styleUrls: ['./tail-table.component.scss'],
})
export class TailTableComponent extends BaseTableComponent<Tail>
  implements AfterViewInit, OnInit {
  dataSource: TailsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['_actions', 'name'];
  searchedColumns = ['name'];
  routeUrl = 'tail';

  constructor(protected apiService: TailService, protected router: Router) {
    super(apiService, router);
  }

  getNewDataSource(): TailsDataSource {
    return new TailsDataSource(this.apiService);
  }
}
