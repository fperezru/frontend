import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOtroComponent } from './view-otro.component';

describe('ViewOtroComponent', () => {
  let component: ViewOtroComponent;
  let fixture: ComponentFixture<ViewOtroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOtroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOtroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
