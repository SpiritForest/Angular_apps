import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckWordsComponent } from './check-words/check-words.component';
import { LearnComponent } from './learn/learn.component';

const routes: Routes = [
  { path: 'new-words', component: CheckWordsComponent },
  { path: 'learn', component: LearnComponent},
  { path: '', component: CheckWordsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
