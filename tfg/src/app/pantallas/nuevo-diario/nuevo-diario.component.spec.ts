import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDiarioComponent } from './nuevo-diario.component';

describe('NuevoDiarioComponent', () => {
  let component: NuevoDiarioComponent;
  let fixture: ComponentFixture<NuevoDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
