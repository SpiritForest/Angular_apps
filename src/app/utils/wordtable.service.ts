import { Injectable } from '@angular/core';
import { oWord } from '../models/oWord';
import { AudioService } from '../audio.service';
import { ReviseService } from '../revise.service';
import { WordService } from '../Word.service';

@Injectable({
  providedIn: 'root'
})
export class WordtableService {

  constructor(
    private audio: AudioService,
    private reviseService: ReviseService,
    private wordService: WordService
    ) { }

  checkAnswer(element, oWord: oWord, index) {
    if (element.value.toLowerCase() === oWord.english.toLowerCase()) {
      element.disabled=true;
      this.reviseService.sendToRevise(oWord);
      this.audio.play(oWord);
      const oElement = document.getElementById(index + 1);
      oElement.focus();
    }
  }

  onKeyup(oEvent, oWord: oWord): void {
    const index = +oEvent.target.id;
    // enter
    if (oEvent.keyCode === 13) {
      this._showHint(oEvent, oWord);
      try {
        document.getElementById(String(index + 1)).focus();
      } catch(er) {
        document.getElementById("0").focus();
      }
    }
    // key up
    if (oEvent.keyCode === 38) {
      try {
        const oElement = document.getElementById(String(index - 1));
        let counter = 1;
        // while (oElement.disabled) {
          
        // }
      } catch(er) {
        const length = document.getElementsByTagName('tr').length;
        document.getElementById(String(length - 1)).focus();
      }
    }
    // key down
    if (oEvent.keyCode === 40) {
      try {
        document.getElementById(String(index + 1)).focus();
      } catch(er) {
        document.getElementById("0").focus();
      }
    }
  };

  _showHint(oEvent, oWord: oWord): void {
    oEvent.target.value = "";
    oEvent.target.placeholder = oWord.english;
    this.audio.play(oWord);
    this._moveToNew(oWord);
  };

  _moveToNew(oWord: oWord) {
    oWord.nextRevise = null;
    oWord.nuberOfRevise = null;
    debugger;
    this.wordService.send(`/words`, oWord).subscribe();
  }
}
