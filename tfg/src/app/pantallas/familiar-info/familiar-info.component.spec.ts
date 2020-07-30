import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliarInfoComponent } from './familiar-info.component';

describe('FamiliarInfoComponent', () => {
  let component: FamiliarInfoComponent;
  let fixture: ComponentFixture<FamiliarInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliarInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
