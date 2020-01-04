import { Component, OnInit } from '@angular/core';
import { aVocabulary } from '../../assets/Vocabulary';
import { SendWordService } from '../sendWord.service';

@Component({
  selector: 'app-check-words',
  templateUrl: './check-words.component.html',
  styleUrls: ['./check-words.component.css'],
  providers: [ SendWordService ]
})
export class CheckWordsComponent implements OnInit {

  aVocab = aVocabulary;

  constructor(private sendWordService: SendWordService) { }

  ngOnInit() {
  }

  sendButtonClick(oWord) {
    this.sendWordService.send(oWord)
      .subscribe(result => console.log("sened"), error => console.log(error));
  }

}
