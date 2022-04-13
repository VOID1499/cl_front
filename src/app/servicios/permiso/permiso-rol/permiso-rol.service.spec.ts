import { TestBed } from '@angular/core/testing';

import { PermisoRolService } from './permiso-rol.service';

describe('PermisoRolService', () => {
  let service: PermisoRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
