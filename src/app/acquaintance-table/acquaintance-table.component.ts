import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseTableComponent } from '@/base/base-table.component';
import { AcquaintancesDataSource } from '@/datasources/acquaintance.datasource';
import { Acquaintance } from '@/model/acquaintance';
import { AcquaintanceService } from './../services/acquaintance.service';

@Component({
  selector: 'app-acquaintance-table',
  templateUrl: './acquaintance-table.component.html',
  styleUrls: ['./acquaintance-table.component.scss'],
})
export class AcquaintanceTableComponent extends BaseTableComponent<Acquaintance>
  implements AfterViewInit, OnInit {
  displayedColumns = ['_actions', 'idCharacter', 'idObject', 'description'];
  searchedColumns = ['character.name', 'object.name', 'description'];
  routeUrl = 'acquaintance';
  protected relations = ['character', 'object'];

  constructor(
    protected apiService: AcquaintanceService,
    protected router: Router
  ) {
    super(apiService, router);
  }

  getNewDataSource(): AcquaintancesDataSource {
    return new AcquaintancesDataSource(this.apiService);
  }
}
