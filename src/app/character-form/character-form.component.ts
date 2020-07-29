import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

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
  id$: Observable<number>;

  model$: Observable<Character>;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modelService: CharacterService
  ) {
    this.id$ = route.params.pipe(map((p) => +p.id));
  }

  ngOnInit() {
    const emptyModel: Character = {};

    this.model$ = this.id$.pipe(
      switchMap((id: number) =>
        id
          ? this.modelService
              .findById(id)
              .pipe(tap((row) => this.form.patchValue(row)))
          : of(emptyModel)
      )
    );
  }

  onSubmit() {
    this.id$
      .pipe(
        switchMap((id: number) => {
          console.log('submit2', id);
          return id
            ? this.modelService.update(id, this.form.value).pipe(
                tap((response) => {
                  console.log(response);
                })
              )
            : this.modelService.create(this.form.value).pipe(
                tap((row) => {
                  this.form.patchValue(row);
                  console.log(row);
                })
              );
        })
      )
      .subscribe();
  }
}

/*

        return +params.get('id')
          ? this.modelService.update(+params.get('id'), this.form.value).pipe(
              tap((response) => {
                console.log(response);
              })
            )
          : this.modelService.create(this.form.value).pipe(
              tap((row) => {
                this.form.patchValue(row);
                console.log(row);
              })
            );
*/
