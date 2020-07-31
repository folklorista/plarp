import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BaseTableComponent } from '@/base/base-table.component';
import { CharactersDataSource } from '@/datasources/character.datasource';
import { Character } from '@/model/character';
import { CharacterService } from '@/services/character.service';

@Component({
  selector: 'app-character-table',
  templateUrl: './character-table.component.html',
  styleUrls: ['./character-table.component.scss'],
})
export class CharacterTableComponent extends BaseTableComponent<Character>
  implements AfterViewInit, OnInit {
  dataSource: CharactersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['_actions', 'name', 'summaryShort'];
  searchedColumns = ['name', 'summaryShort'];
  routeUrl = 'character';

  constructor(
    protected apiService: CharacterService,
    protected router: Router
  ) {
    super(apiService, router);
  }

  getNewDataSource(): CharactersDataSource {
    return new CharactersDataSource(this.apiService);
  }
}
