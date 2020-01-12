import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckWordsComponent } from './check-words/check-words.component';
import { LearnComponent } from './learn/learn.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckWordsComponent,
    LearnComponent,
    HeaderToolbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
