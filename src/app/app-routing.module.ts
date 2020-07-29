import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterFormComponent } from './character-form/character-form.component';
import { CharacterTableComponent } from './character-table/character-table.component';
import { UserTableComponent } from './user-table/user-table.component';

const routes: Routes = [
  { path: 'character', component: CharacterTableComponent },
  { path: 'character/:id', component: CharacterFormComponent },
  { path: 'character/new', component: CharacterFormComponent },
  { path: 'user', component: UserTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
