import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaFichasComponent } from './pagina-fichas.component';

describe('PaginaFichasComponent', () => {
  let component: PaginaFichasComponent;
  let fixture: ComponentFixture<PaginaFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaFichasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
