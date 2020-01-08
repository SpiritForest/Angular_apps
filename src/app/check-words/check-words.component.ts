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

@Component({
  selector: 'app-check-words',
  templateUrl: './check-words.component.html',
  styleUrls: ['./check-words.component.css'],
  providers: [WordService]
})
export class CheckWordsComponent implements OnInit {
  
  aVocab: any;
  sInputValue = "";
  sTableTitle = `Rest words`;

  constructor(private sendWordService: WordService, private http: HttpClient) {}

  ngOnInit(): void {
    this.sendWordService.getWords("/words").subscribe((response) => {
      this.aVocab = response;
      this.sTableTitle = this.sTableTitle + `: ${this.aVocab.length}`;
    })
  }

  // sendButtonClick(oWord) {
  //   this.sendWordService.send(oWord)
  //     .subscribe(result => console.log("sened"), error => console.log(error));
  //   this.sendWordService.get().subscribe(result => console.log(result));
  // }

  checkAnswer(oEvent, oWord) {
    if (oWord.english.toLowerCase() === oEvent.target.value) {
      oEvent.target.disabled = true;
    }
  }

}
