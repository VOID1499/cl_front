import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoOrganizacionComponent } from './listado-organizacion.component';

describe('ListadoOrganizacionComponent', () => {
  let component: ListadoOrganizacionComponent;
  let fixture: ComponentFixture<ListadoOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoOrganizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
