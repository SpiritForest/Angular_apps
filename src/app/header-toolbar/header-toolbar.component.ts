import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.css']
})
export class HeaderToolbarComponent implements OnInit {
  bIsNewPress: boolean = true;
  iWordsForLearn: number;
  currentText: string;

  constructor() { }

  ngOnInit() {
    this.bIsNewPress = true;
  }

  onClick(oEvent):void {
    const sValue = oEvent.target.textContent || oEvent.target.text;
    switch(sValue) {
      case "New": {
        this.bIsNewPress = true;
        break;
      }
      case "Revise": {
        this.bIsNewPress = false;
        break;
      }
    }
  }
}
