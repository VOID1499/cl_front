import { TestBed } from '@angular/core/testing';

import { KLangService } from './k-lang.service';

describe('KLangService', () => {
  let service: KLangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KLangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
