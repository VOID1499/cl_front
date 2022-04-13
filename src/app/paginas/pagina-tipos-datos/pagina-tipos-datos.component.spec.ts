import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaTiposDatosComponent } from './pagina-tipos-datos.component';

describe('PaginaTiposDatosComponent', () => {
  let component: PaginaTiposDatosComponent;
  let fixture: ComponentFixture<PaginaTiposDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaTiposDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaTiposDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
