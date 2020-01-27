import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.css']
})
export class HeaderToolbarComponent implements OnInit {
  bIsNewPres: boolean;
  iWordsForLearn: number;

  constructor() { }

  ngOnInit() {
    this.bIsNewPres = true;
  }

  onClick(sText):void {
    switch(sText) {
      case "New": {
        this.bIsNewPres = true;
        break;
      }
      case "Revise": {
        this.bIsNewPres = false;
        break;
      }
    }
  }
}
