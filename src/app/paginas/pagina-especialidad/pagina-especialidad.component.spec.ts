import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEspecialidadComponent } from './pagina-especialidad.component';

describe('PaginaEspecialidadComponent', () => {
  let component: PaginaEspecialidadComponent;
  let fixture: ComponentFixture<PaginaEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
