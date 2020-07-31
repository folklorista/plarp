import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcquaintanceFormComponent } from './acquaintance-form/acquaintance-form.component';
import { AcquaintanceTableComponent } from './acquaintance-table/acquaintance-table.component';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CharacterTableComponent } from './character-table/character-table.component';
import { TailFormComponent } from './tail-form/tail-form.component';
import { TailTableComponent } from './tail-table/tail-table.component';
import { UserTableComponent } from './user-table/user-table.component';

const routes: Routes = [
  { path: 'character', component: CharacterTableComponent },
  { path: 'character/:id', component: CharacterFormComponent },
  { path: 'character/new', component: CharacterFormComponent },
  { path: 'acquaintance', component: AcquaintanceTableComponent },
  { path: 'acquaintance/:id', component: AcquaintanceFormComponent },
  { path: 'acquaintance/new', component: AcquaintanceFormComponent },
  { path: 'tail', component: TailTableComponent },
  { path: 'tail/:id', component: TailFormComponent },
  { path: 'tail/new', component: TailFormComponent },
  { path: 'user', component: UserTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
