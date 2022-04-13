import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaFeriadosComponent } from './pagina-feriados.component';

describe('PaginaFeriadosComponent', () => {
  let component: PaginaFeriadosComponent;
  let fixture: ComponentFixture<PaginaFeriadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaFeriadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaFeriadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
