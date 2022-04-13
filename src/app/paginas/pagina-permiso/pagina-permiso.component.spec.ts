import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPermisoComponent } from './pagina-permiso.component';

describe('PaginaPermisoComponent', () => {
  let component: PaginaPermisoComponent;
  let fixture: ComponentFixture<PaginaPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaPermisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
