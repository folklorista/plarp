import { Component, Input, OnInit } from '@angular/core';

import { Acquaintance } from '@/model/acquaintance';
import { AcquaintanceService } from '@/services/acquaintance.service';

@Component({
  selector: 'app-acquaintance-detail',
  templateUrl: './acquaintance-detail.component.html',
  styleUrls: ['./acquaintance-detail.component.scss'],
})
export class AcquaintanceDetailComponent implements OnInit {
  @Input() id: number;
  @Input() isObject?: boolean;
  model: Acquaintance;
  relations: string[] = ['character', 'object'];

  constructor(public modelService: AcquaintanceService) {}

  ngOnInit() {
    this.modelService
      .find(this.id.toString(), ['id'], null, null, null, this.relations)
      .subscribe((result) => (this.model = result ? result[0] : null));
  }
}
