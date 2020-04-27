import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOtroComponent } from './editar-otro.component';

describe('EditarOtroComponent', () => {
  let component: EditarOtroComponent;
  let fixture: ComponentFixture<EditarOtroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarOtroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarOtroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
