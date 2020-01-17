import { Component, OnInit } from '@angular/core';
import { WordService } from '../Word.service';

@Component({
  selector: 'app-revise-words',
  templateUrl: './revise-words.component.html',
  styleUrls: ['./revise-words.component.css']
})
export class ReviseWordsComponent implements OnInit {

  aVocab;
  sTableTitle: string;

  constructor(private wordService: WordService) { }

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

  checkAnswer(sValue, oWord) {
    if (sValue.toLowerCase() === oWord.english.toLowerCase()) {
      this.deleteWordFromTable(oWord);
      this.sendToRevise();
    }
  }

  deleteWordFromTable(oWord) {
    const index = this.aVocab.indexOf(oWord);
    this.aVocab.splice(index, 1);
    this.setTableTitle();
  }

  setTableTitle(): void {
    this.sTableTitle = `Words (${this.aVocab.length})`;
  }

  sendToRevise() {

  }

  onKeyup(oEvent, oWord) {
    if (oEvent.keyCode === 13) {
      this.showHint(oEvent, oWord);
    }
  }

  showHint(oEvent, oWord) {
    oEvent.target.value = "";
    oEvent.target.placeholder = oWord.english;
  }

  onFocus(oWord) {
    console.log(oWord.english);
  }

}
