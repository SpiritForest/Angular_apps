import { Injectable } from '@angular/core';
import { WordService } from './Word.service';

@Injectable({
  providedIn: 'root'
})
export class ReviseService {

  constructor(private wordService: WordService) { }

  getNextRevise(iRevised): any {
    const minute = 60 * 1000;
    const hour = 3600 * 1000;
    const day = 3600 * 24 * 1000;
    const iCurrentTime = new Date().getTime();

    switch (iRevised) {
      case 1: 
        return iCurrentTime;
      case 2:
        return iCurrentTime + minute * 20;
      case 3: 
        return iCurrentTime + hour * 9;
      case 4: 
        return iCurrentTime + day;
      case 5:
        return iCurrentTime + day * 2;
      case 6:
        return iCurrentTime + day * 6;
      case 7:
        return iCurrentTime + day * 31;
      case 8:
        return iCurrentTime + day * 78;
      case 9:
        return iCurrentTime + day * 195;
    }
    return undefined;
  }

  sendToRevise(oWord) {
    let iRevised = oWord.nuberOfRevise || 1;

    iRevised += 1;
    oWord.nextRevise = this.getNextRevise(iRevised);

    // if no returned date, send to learned
    if (!oWord.nextRevise) {
      this.wordService.markLearned(oWord);
      return;
    }

    oWord.nuberOfRevise = iRevised;
    this.wordService.send("/words", oWord).subscribe();

  }

}
