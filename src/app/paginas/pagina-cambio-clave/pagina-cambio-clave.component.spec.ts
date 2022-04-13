import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCambioClaveComponent } from './pagina-cambio-clave.component';

describe('PaginaCambioClaveComponent', () => {
  let component: PaginaCambioClaveComponent;
  let fixture: ComponentFixture<PaginaCambioClaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaCambioClaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCambioClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
