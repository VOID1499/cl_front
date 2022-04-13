import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteFichaComponent } from './paciente-ficha.component';

describe('PacienteFichaComponent', () => {
  let component: PacienteFichaComponent;
  let fixture: ComponentFixture<PacienteFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteFichaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
