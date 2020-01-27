import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatDialogModule, MatButtonModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearnComponent } from './learn/learn.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { ReviseWordsComponent } from './revise-words/revise-words.component';
import { NewWordsComponent } from './new-words/new-words.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { DialogComponent, DialogOverviewExampleDialog } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LearnComponent,
    HeaderToolbarComponent,
    ReviseWordsComponent,
    NewWordsComponent,
    TableHeaderComponent,
    DialogComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog]
})
export class AppModule { }
