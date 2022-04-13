import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoRolesComponent } from './permiso-roles.component';

describe('PermisoRolesComponent', () => {
  let component: PermisoRolesComponent;
  let fixture: ComponentFixture<PermisoRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisoRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisoRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
