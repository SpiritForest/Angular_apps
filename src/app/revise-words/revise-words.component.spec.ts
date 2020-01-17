import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseWordsComponent } from './revise-words.component';

describe('ReviseWordsComponent', () => {
  let component: ReviseWordsComponent;
  let fixture: ComponentFixture<ReviseWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviseWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviseWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
