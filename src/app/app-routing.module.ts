import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnComponent } from './learn/learn.component';
import { ReviseWordsComponent } from './revise-words/revise-words.component';
import { NewWordsComponent } from './new-words/new-words.component';

const routes: Routes = [
  { path: 'new-words', component: NewWordsComponent },
  { path: 'learn', component: LearnComponent},
  { path: 'revise', component: ReviseWordsComponent},
  { path: '', component: NewWordsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
