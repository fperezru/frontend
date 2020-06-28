import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMascotaComponent } from './view-mascota.component';

describe('ViewMascotaComponent', () => {
  let component: ViewMascotaComponent;
  let fixture: ComponentFixture<ViewMascotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMascotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
