import { TestBed } from '@angular/core/testing';

import { APIHostInterceptor } from './apihost.interceptor';

describe('APIHostInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      APIHostInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: APIHostInterceptor = TestBed.inject(APIHostInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
