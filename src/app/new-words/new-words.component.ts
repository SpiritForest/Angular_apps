import { Component, OnInit } from '@angular/core';
import { WordService } from '../Word.service';
import { WordtableService } from '../utils/wordtable.service';
import { ReviseService } from '../revise.service';
import { oWord } from '../models/oWord';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-new-words',
  templateUrl: './new-words.component.html',
  styleUrls: ['./new-words.component.css']
})
export class NewWordsComponent implements OnInit {

  aVocab;
  focusedRow;
  sTableTitle: string;
  
  constructor(
    private wordService: WordService,
    private tableService: WordtableService,
    private reviseService: ReviseService,
    private audio: AudioService) { }

  ngOnInit() {
    this.getNewWords();
  }

  getNewWords() {
    let aVocab = [];
    this.wordService.getWords('/words')
      .subscribe(aResult => {
        aVocab = aResult.filter(element => !element.nextRevise);
        this.getRandomWords(aVocab);
      });
  }

  getRandomWords(aVocab): void {
    const random = 20;
    const aRandomIndices = [];
    let iRandom: number;
    const iVocabLength = aVocab.length;

    while (true) {
      if (aRandomIndices.length === random) {
        break;
      }
      iRandom = Math.round(Math.random() * iVocabLength);
      if (!aRandomIndices.includes(iRandom)) {
        aRandomIndices.push(iRandom);
      }
    }
    this.aVocab = aRandomIndices.map(element => aVocab[element]);
  }

  checkAnswer(element, oWord: oWord, index) {
    this.tableService.checkAnswer(element, oWord, index);
  }

  deleteWordFromTable(oWord: oWord) {
    const index = this.aVocab.indexOf(oWord);
    this.aVocab.splice(index, 1);
    this.setTableTitle();
  }

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

  onLearned(oEvent, oWord: oWord) {
    oEvent.target.style.background = "#e0ff80";
    this.wordService.markLearned(oWord);
  }
}
