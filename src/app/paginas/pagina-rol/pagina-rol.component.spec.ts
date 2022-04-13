import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRolComponent } from './pagina-rol.component';

describe('PaginaRolComponent', () => {
  let component: PaginaRolComponent;
  let fixture: ComponentFixture<PaginaRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
