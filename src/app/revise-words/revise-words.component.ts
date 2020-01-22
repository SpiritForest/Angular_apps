import { Component, OnInit } from '@angular/core';
import { WordService } from '../Word.service';
import { AudioService } from '../audio.service';
import { ReviseService } from '../revise.service';
import { oWord } from '../models/oWord';
import { WordtableService } from '../utils/wordtable.service';

@Component({
  selector: 'app-revise-words',
  templateUrl: './revise-words.component.html',
  styleUrls: ['./revise-words.component.css']
})
export class ReviseWordsComponent implements OnInit {

  aVocab;
  focusedRow;
  sTableTitle: string;

  constructor(
    private wordService: WordService, 
    private audio: AudioService,
    private reviseService: ReviseService,
    private tableService: WordtableService) { }

  ngOnInit() {
    this.getWordsToRevise();
  }

  getWordsToRevise():any {
    const iCurrentDate = new Date().getTime();

    this.wordService.getWords('/words')
      .subscribe(aResult => {
        this.aVocab = aResult.filter(element => iCurrentDate > element.nextRevise && element.nextRevise);
        this.setTableTitle();
      });
  }

  checkAnswer(element, oWord: oWord, index) {
    this.tableService.checkAnswer(element, oWord, index);
  }

  // deleteWordFromTable(oWord: oWord) {
  //   const index = this.aVocab.indexOf(oWord);
  //   this.aVocab.splice(index, 1);
  //   this.setTableTitle();
  // }

  setTableTitle(): void {
    this.sTableTitle = `Words (${this.aVocab.length})`;
  }

  onKeyup(oEvent, oWord: oWord): void {
    this.tableService.onKeyup(oEvent, oWord);
  }

  showHint(oEvent, oWord: oWord): void {
    this.tableService.showHint(oEvent, oWord);
  }

  onFocus(oWord: oWord): void {
    this.focusedRow = oWord;
  }

}
