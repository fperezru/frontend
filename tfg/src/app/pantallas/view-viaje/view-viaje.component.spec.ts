import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewViajeComponent } from './view-viaje.component';

describe('ViewViajeComponent', () => {
  let component: ViewViajeComponent;
  let fixture: ComponentFixture<ViewViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewViajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
