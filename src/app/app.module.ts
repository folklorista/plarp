import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AcquaintanceDetailComponent } from './acquaintance-detail/acquaintance-detail.component';
import { AcquaintanceFormComponent } from './acquaintance-form/acquaintance-form.component';
import { AcquaintanceTableComponent } from './acquaintance-table/acquaintance-table.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CharacterTableComponent } from './character-table/character-table.component';
import { NavComponent } from './nav/nav.component';
import { TailTableComponent } from './tail-table/tail-table.component';
import { UserTableComponent } from './user-table/user-table.component';
import { TailFormComponent } from './tail-form/tail-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CharacterTableComponent,
    UserTableComponent,
    CharacterFormComponent,
    AcquaintanceTableComponent,
    AcquaintanceFormComponent,
    AcquaintanceDetailComponent,
    TailTableComponent,
    TailFormComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
