import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliarDiarioComponent } from './familiar-diario.component';

describe('FamiliarDiarioComponent', () => {
  let component: FamiliarDiarioComponent;
  let fixture: ComponentFixture<FamiliarDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliarDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliarDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
