import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { BaseService } from '@/services/base.service';
import { Base } from '../model/base';

export abstract class BaseFormComponent<T extends Base> implements OnInit {
  abstract form: FormGroup;
  id$: Observable<number>;
  relations: string[] = [];
  model: T;
  sortColumn = 'id';
  constructor(
    protected fb: FormBuilder,
    protected modelService: BaseService<T>,
    protected route: ActivatedRoute,
    protected router: Router,
    protected snackBar: MatSnackBar
  ) {
    this.id$ = route.params.pipe(map((p) => +p.id));
  }

  ngOnInit() {
    // tslint:disable-next-line: no-object-literal-type-assertion
    const emptyModel: T = {} as T;

    this.id$
      .pipe(
        switchMap((id: number) =>
          id
            ? this.modelService
                .find(
                  id.toString(),
                  ['id'],
                  this.sortColumn,
                  'asc',
                  null,
                  null,
                  this.relations
                )
                .pipe(tap((row) => this.form.patchValue(row)))
            : of(emptyModel)
        )
      )
      .subscribe((result) => {
        this.model = result ? result[0] : null;
        this.form.patchValue(this.model);
      });
  }

  onSubmit() {
    this.id$
      .pipe(
        switchMap((id: number) => {
          return id
            ? this.modelService.update(id, this.form.value).pipe(
                tap((response) => {
                  this.openSnackBar('změny byly uloženy', 'OK');
                })
              )
            : this.modelService.create(this.form.value).pipe(
                tap((row) => {
                  this.form.patchValue(row);
                  this.openSnackBar('nový záznam byl vytvořen', 'OK');
                  this.router.navigate(['..', row.id], {
                    relativeTo: this.route,
                  });
                })
              );
        })
      )
      .subscribe();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
