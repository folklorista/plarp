import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BaseFormComponent } from '@/base/base-form.component.ts';
import { Acquaintance } from '@/model/acquaintance';
import { AcquaintanceService } from '@/services/acquaintance.service';
import { Character } from './../model/character';
import { CharacterService } from './../services/character.service';

@Component({
  selector: 'app-acquaintance-form',
  templateUrl: './acquaintance-form.component.html',
  styleUrls: ['./acquaintance-form.component.scss'],
})
export class AcquaintanceFormComponent extends BaseFormComponent<Acquaintance>
  implements OnInit {
  form = this.fb.group({
    idCharacter: [null, Validators.required],
    idObject: [null, Validators.required],
    description: '',
    sandbox: '',
    orgNote: '',
  });

  characters$: Observable<Character[]>;

  constructor(
    protected fb: FormBuilder,
    protected modelService: AcquaintanceService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected snackBar: MatSnackBar,
    private characterService: CharacterService
  ) {
    super(fb, modelService, route, router, snackBar);
  }

  ngOnInit() {
    super.ngOnInit();
    this.characters$ = this.characterService.findAll();
  }
}
