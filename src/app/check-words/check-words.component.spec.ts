import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckWordsComponent } from './check-words.component';

describe('CheckWordsComponent', () => {
  let component: CheckWordsComponent;
  let fixture: ComponentFixture<CheckWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
