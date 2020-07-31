import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseFormComponent } from '@/base/base-form.component.ts';
import { Character } from '@/model/character';
import { CharacterService } from '@/services/character.service';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
})
export class CharacterFormComponent extends BaseFormComponent<Character>
  implements OnInit {
  form = this.fb.group({
    sorting: '',
    name: [null, Validators.required],
    summaryShort: '',
    summaryLong: '',
    equipment: '',
    description: '',
    sandbox: '',
    orgNote: '',
  });

  constructor(
    protected fb: FormBuilder,
    protected modelService: CharacterService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected snackBar: MatSnackBar
  ) {
    super(fb, modelService, route, router, snackBar);
    this.relations.push(
      'player.xQuality.quality',
      'acquaintances',
      'acquaintancesAsObject',
      'involvements.tail'
    );
  }
}
