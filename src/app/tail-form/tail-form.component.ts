import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseFormComponent } from '@/base/base-form.component.ts';
import { Tail } from '@/model/tail';
import { TailService } from '@/services/tail.service';

@Component({
  selector: 'app-tail-form',
  templateUrl: './tail-form.component.html',
  styleUrls: ['./tail-form.component.scss'],
})
export class TailFormComponent extends BaseFormComponent<Tail>
  implements OnInit {
  form = this.fb.group({
    name: [null, Validators.required],
    description: '',
    sandbox: '',
    orgNote: '',
  });

  constructor(
    protected fb: FormBuilder,
    protected modelService: TailService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected snackBar: MatSnackBar
  ) {
    super(fb, modelService, route, router, snackBar);
    this.relations.push('involvements.character');
  }
}
