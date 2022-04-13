import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPacientesComponent } from './pagina-pacientes.component';

describe('PaginaPacientesComponent', () => {
  let component: PaginaPacientesComponent;
  let fixture: ComponentFixture<PaginaPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaPacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
