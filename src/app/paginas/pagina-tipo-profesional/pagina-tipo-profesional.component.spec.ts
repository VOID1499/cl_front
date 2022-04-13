import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaTipoProfesionalComponent } from './pagina-tipo-profesional.component';

describe('PaginaTipoProfesionalComponent', () => {
  let component: PaginaTipoProfesionalComponent;
  let fixture: ComponentFixture<PaginaTipoProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaTipoProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaTipoProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
