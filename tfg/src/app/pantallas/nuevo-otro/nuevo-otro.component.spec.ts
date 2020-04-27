import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoOtroComponent } from './nuevo-otro.component';

describe('NuevoOtroComponent', () => {
  let component: NuevoOtroComponent;
  let fixture: ComponentFixture<NuevoOtroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoOtroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoOtroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
