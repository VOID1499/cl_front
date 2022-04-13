import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaOrganizacionComponent } from './pagina-organizacion.component';

describe('PaginaOrganizacionComponent', () => {
  let component: PaginaOrganizacionComponent;
  let fixture: ComponentFixture<PaginaOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaOrganizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
