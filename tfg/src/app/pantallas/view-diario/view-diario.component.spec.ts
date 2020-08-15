import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiarioComponent } from './view-diario.component';

describe('ViewDiarioComponent', () => {
  let component: ViewDiarioComponent;
  let fixture: ComponentFixture<ViewDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
