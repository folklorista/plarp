import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Character } from '@/model/character';
import { CharacterService } from '@/services/character.service';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
})
export class CharacterFormComponent implements OnInit {
  form = this.fb.group({
    name: [null, Validators.required],
    summaryShort: null,
    summaryLong: null,
    equipment: null,
    description: null,
    sandbox: null,
    orgNote: null,
  });

  model$: Observable<Character>;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modelService: CharacterService
  ) {}

  ngOnInit() {
    this.model$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.modelService
          .findById(+params.get('id'))
          .pipe(tap((user) => this.form.patchValue(user)))
      )
    );
  }

  onSubmit() {
    alert('Thanks!');
  }
}
