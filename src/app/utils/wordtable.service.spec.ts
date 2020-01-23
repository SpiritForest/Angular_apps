import { TestBed } from '@angular/core/testing';

import { WordtableService } from './wordtable.service';

describe('WordtableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordtableService = TestBed.get(WordtableService);
    expect(service).toBeTruthy();
  });
});
