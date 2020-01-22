import { Injectable } from '@angular/core';
import { oWord } from '../models/oWord';
import { AudioService } from '../audio.service';
import { ReviseService } from '../revise.service';
import { WordService } from '../Word.service';

@Injectable({
  providedIn: 'root'
})
export class WordtableService {
  
  iUncheckedWords: number;

  constructor(
    private audio: AudioService,
    private reviseService: ReviseService,
    private wordService: WordService
    ) { }

  getUncheckedWords(): number {
    return this.iUncheckedWords || 0;;
  }

  setUncheckedWords(iNumber: number) {
    this.iUncheckedWords = iNumber || 0;
  } 

  checkAnswer(element, oWord: oWord, index) {
    if (element.value.toLowerCase() === oWord.english.toLowerCase()) {
      element.disabled=true;
      element.setAttribute("style", "background: #b0f7b3");
      this.reviseService.sendToRevise(oWord);
      this.audio.play(oWord);
      this.iUncheckedWords -= 1;
      if (this.iUncheckedWords) {
        const oElement = document.getElementById(index + 1);
        oElement.focus();
      }
    }
  }

  onKeyup(oEvent, oWord: oWord): void {
    const index = +oEvent.target.id;
    let iCurrentIndex = index;
    let oInput, length;
    
    length = document.getElementsByTagName('tr').length;

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
        while (true) {
          oInput = document.getElementById(String(iCurrentIndex - 1));
          iCurrentIndex -= 1;
          if (!oInput.disabled) {
            oInput.focus();
            break;
          }
        }
      } catch(er) {
        document.getElementById(String(length - 1)).focus();
      }
    }
    // key down
    if (oEvent.keyCode === 40) {
      try {
        while (true) {
          oInput = document.getElementById(String(iCurrentIndex + 1));
          iCurrentIndex += 1;
          if (!oInput.disabled) {
            oInput.focus();
            break;
          }
        }
      } catch(er) {
        iCurrentIndex = 0;
        while (true) {
          oInput = document.getElementById(String(iCurrentIndex));
          iCurrentIndex += 1;
          if (!oInput.disabled) {
            oInput.focus();
            break;
          }
        }
      }
    }
  };

  _showHint(oEvent, oWord: oWord): void {
    let oInput = oEvent.target;
    oInput.value = "";
    oInput.placeholder = oWord.english;
    oInput.disabled = "true";
    oInput.setAttribute("style", "background:#fcb1bd")
    this.audio.play(oWord);
    this.iUncheckedWords -= 1;
    this._moveToNew(oWord);
  };

  _moveToNew(oWord: oWord) {
    oWord.nextRevise = null;
    oWord.nuberOfRevise = null;
    this.wordService.send(`/words`, oWord).subscribe();
  }
}
