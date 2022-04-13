import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDatosComponent } from './tipos-datos.component';

describe('TiposDatosComponent', () => {
  let component: TiposDatosComponent;
  let fixture: ComponentFixture<TiposDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
