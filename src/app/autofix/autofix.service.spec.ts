import { TestBed } from '@angular/core/testing';

import { AutofixService } from './autofix.service';

describe('AutofixService', () => {
  let service: AutofixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutofixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
