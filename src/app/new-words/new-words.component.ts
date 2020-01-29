import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';
import {
  WordService
} from '../Word.service';
import {
  WordtableService
} from '../utils/wordtable.service';
import {
  oWord
} from '../models/oWord';


@Component({
  selector: 'app-new-words',
  templateUrl: './new-words.component.html',
  styleUrls: ['./new-words.component.css']
})
export class NewWordsComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['russian', 'image', 'input', 'learned'];
  iUnlearnedTotal: number;
  aVocab;
  focusedRow;
  sTableTitle: string;
  iQuantityWordsInTheTable: number = 20;

  constructor(
    private wordService: WordService,
    private tableService: WordtableService) {}

  ngAfterViewInit(){
    console.log("afterinit")
  }

  ngOnInit() {
    this.getNewWords();
  }

  getNewWords() {
    let aVocab = [];
    this.wordService.getWords('/words')
      .subscribe(aResult => {
        aVocab = aResult.filter(element => !element.nextRevise);
        this.getRandomWords(aVocab);
        this.tableService.setiTotalNumber(aVocab.length);
        this.setTableTitle();
        try {
          document.getElementById("0").focus();
        } catch (er) {
          console.log("changes")
        }
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
    this.setTableTitle();
  }

  deleteWordFromTable(oWord: oWord) {
    const index = this.aVocab.indexOf(oWord);
    this.aVocab.splice(index, 1);
    this.setTableTitle();
  }

  setTableTitle(): void {
    let iUncheckedWords = this.tableService.getUncheckedWords();
    this.iUnlearnedTotal = this.tableService.getiTotalNumber();
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
    let oButton;
    
    if (oEvent.target.childElementCount === 0) {
      oButton = oEvent.target.parentNode;
    } 
    else {
      oButton = oEvent.target;
    }

    oButton.style.background = "#b0f7b3";
    oButton.disabled = true;

    this.wordService.markLearned(oWord);
  }
}
