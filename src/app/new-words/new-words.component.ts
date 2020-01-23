import { Component, OnInit } from '@angular/core';
import { WordService } from '../Word.service';
<<<<<<< HEAD
=======
import { WordtableService } from '../utils/wordtable.service';
import { ReviseService } from '../revise.service';
import { oWord } from '../models/oWord';
import { AudioService } from '../audio.service';
>>>>>>> origin/English_app

@Component({
  selector: 'app-new-words',
  templateUrl: './new-words.component.html',
  styleUrls: ['./new-words.component.css']
})
export class NewWordsComponent implements OnInit {

  aVocab;
<<<<<<< HEAD
  sTableTitle: string;
  
  constructor(private wordService: WordService) { }
=======
  focusedRow;
  sTableTitle: string;
  iUnlearnedTotal: number;
  iQuantityWordsInTheTable: number = 20;
  
  constructor(
    private wordService: WordService,
    private tableService: WordtableService,
    private reviseService: ReviseService,
    private audio: AudioService) { }
>>>>>>> origin/English_app

  ngOnInit() {
    this.getNewWords();
  }

  getNewWords() {
<<<<<<< HEAD
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

=======
    let aVocab = [];
    this.wordService.getWords('/words')
      .subscribe(aResult => {
        aVocab = aResult.filter(element => !element.nextRevise);
        this.iUnlearnedTotal = aVocab.length;
        this.getRandomWords(aVocab);
      });
  }

  getRandomWords(aVocab): void {
    const aRandomIndices = [];
    let iRandom: number;
    const iVocabLength = aVocab.length;

    this.tableService.setUncheckedWords(this.iQuantityWordsInTheTable);

    while (true) {
      if (aRandomIndices.length === this.iQuantityWordsInTheTable) {
        break;
      }
      iRandom = Math.round(Math.random() * iVocabLength);
      if (!aRandomIndices.includes(iRandom)) {
        aRandomIndices.push(iRandom);
      }
    }
    this.aVocab = aRandomIndices.map(element => aVocab[element]);
    this.setTableTitle();
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
    let iUncheckedWords = this.tableService.getUncheckedWords();
    this.iUnlearnedTotal -= this.iQuantityWordsInTheTable - iUncheckedWords;  
    this.sTableTitle = `Words (${this.tableService.getUncheckedWords()})`;
    if (iUncheckedWords === 0) {
      // update a table (get new words)
      this.getNewWords();
    }
  }
  
  onKeyup(oEvent, oWord: oWord): void {
    this.tableService.onKeyup(oEvent, oWord);
    this.setTableTitle();
  }

  onFocus(oWord: oWord): void {
    this.focusedRow = oWord;
  }

  onLearned(oEvent, oWord: oWord) {
    oEvent.target.style.background = "#e0ff80";
    this.wordService.markLearned(oWord);
  }
>>>>>>> origin/English_app
}
