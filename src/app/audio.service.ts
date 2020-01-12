import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  play(oWord) {
    const audio = document.createElement("audio");
    audio.src = oWord.audioPath;
    audio.play();
    audio.addEventListener("ended", this._onEnded.bind(this, audio), true);
    
  }

  _onEnded(audio) {
    audio.removeEventListener("ended", this._onEnded, true);
    audio.remove();
  }
}
