import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarViajeComponent } from './editar-viaje.component';

describe('EditarViajeComponent', () => {
  let component: EditarViajeComponent;
  let fixture: ComponentFixture<EditarViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarViajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
