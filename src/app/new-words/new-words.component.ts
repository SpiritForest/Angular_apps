import { Component, OnInit } from '@angular/core';
import { WordService } from '../Word.service';

@Component({
  selector: 'app-new-words',
  templateUrl: './new-words.component.html',
  styleUrls: ['./new-words.component.css']
})
export class NewWordsComponent implements OnInit {

  aVocab;
  sTableTitle: string;
  
  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.getNewWords();
  }

  getNewWords() {
    this.wordService.getWords('/words')
      .subscribe(aResult => {
        this.aVocab = aResult.filter(element => !element.nextRevise);
        this.setTableTitle();
      });
  }

  setTableTitle() {
    this.sTableTitle = `Words (${this.aVocab.length})`;
  }

  onMarkLearned(oWord) {
    this.wordService.markLearned(oWord);
  }

  checkAnswer(oEvent, sText) {
  }

  onKeyup(oEvent, oWord) {
    if (oEvent.keyCode === 13) {
      oEvent.target
      this.showHint(oWord);
    }
  }

  showHint(oWord) {

  }

}
