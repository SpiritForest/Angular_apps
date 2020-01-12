import { TestBed } from '@angular/core/testing';

import { ReviseService } from './revise.service';

describe('ReviseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviseService = TestBed.get(ReviseService);
    expect(service).toBeTruthy();
  });
});
