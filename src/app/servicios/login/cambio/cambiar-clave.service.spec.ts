import { TestBed } from '@angular/core/testing';

import { CambiarClaveService } from './cambiar-clave.service';

describe('CambiarClaveService', () => {
  let service: CambiarClaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambiarClaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
