import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterTableComponent } from './character-table/character-table.component';
import { UserTableComponent } from './user-table/user-table.component';

const routes: Routes = [
  { path: 'character', component: CharacterTableComponent },
  { path: 'user', component: UserTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
