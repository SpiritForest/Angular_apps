import {
  Component,
  OnInit
} from '@angular/core';
import {
  WordService
} from '../Word.service';
import {
  HttpClient
} from '@angular/common/http';
import { ReviseService } from '../revise.service';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-check-words',
  templateUrl: './check-words.component.html',
  styleUrls: ['./check-words.component.css'],
  providers: [WordService]
})
export class CheckWordsComponent implements OnInit {
  
  aVocab: any;
  sInputValue = "";
  sTableTitle: string;
  hintWord: any;
  selectedWord; 
  learnMode = false;

  constructor(
    private WordService: WordService, 
    private http: HttpClient, 
    private reviseService: ReviseService,
    private audioService: AudioService
    ) {}

  ngOnInit(): void {
    this.onShowOnLearn();
  };

  checkAnswer(oEvent, oWord) {
    if (oWord.english.toLowerCase() === oEvent.target.value) {
      oEvent.target.disabled = true;
      this._sendToRevise(oWord);
      const index = this.aVocab.indexOf(oWord);
      this.aVocab.splice(index, 1);
      this._updateTableTitle();
    }
  };

  onShowOnLearn(): void {
    this.learnMode = false;
    const iCurrentTime = new Date().getTime();

    this.WordService.getWords("/words").subscribe(aResult => {
      this.aVocab = aResult.filter(element => {
        return (element.nextRevise < iCurrentTime && element.nuberOfRevise)
      });
      if (!this.aVocab.length) {
        this.onShowNew();
        return;
      };
      this._updateTableTitle();
    });
  };

  _sendToRevise(oWord): void {
    const oReviseWord = oWord;
  
    if (!oReviseWord.nuberOfRevise) {
      oReviseWord.nuberOfRevise = 1;
    }
    
    oReviseWord.nextRevise = this._getNextReviseDate(oReviseWord.nuberOfRevise++);
    this.WordService.send("/words", oReviseWord).subscribe(response => {
      // this._updateTable();
    });
  };

  _updateTable(): void {
    const iCurrentTime = new Date().getTime() - 5000;

    this.aVocab = this.aVocab.filter(element => element.nextRevise < iCurrentTime);
    this._updateTableTitle();
  }

  _updateTableTitle(): void {
    this.sTableTitle = `Rest words ${this.aVocab.length}`;
  };

  onDelete(oWord): void {
    this.WordService.delete(oWord);
    this.onShowNew();
  }

  _getNextReviseDate(iRevised): any {
    return this.reviseService.getNextRevise(iRevised);
  }
  
  onMarkAsLearned(oWord): void {
    this.WordService.send("/learned", oWord).subscribe();
    this.WordService.delete(oWord);
    const index = this.aVocab.indexOf(oWord);
    this.aVocab.splice(index, 1);
  }

  onGiveHint(oWord): void {
    const zeroReviseObj = oWord;
    zeroReviseObj.nextRevise = null;
    zeroReviseObj.nuberOfRevise = null;
    this.hintWord = oWord;

    this.audioService.play(zeroReviseObj);
    this.WordService.send("/words", zeroReviseObj).subscribe();
  }

  onFocus(oWord) {
    this.selectedWord = oWord;
  }

  onShowNew() {
    this.learnMode = false;
    const iCurrentTime = new Date().getTime();

    this.WordService.getWords("/words").subscribe(aResult => {
      this.aVocab = aResult.filter(element => {
        return element.nextRevise < iCurrentTime && !element.nextRevise
      });
      this._updateTableTitle();
    });
  }

  onLearn() {
    this.learnMode = true;
  }
}
  