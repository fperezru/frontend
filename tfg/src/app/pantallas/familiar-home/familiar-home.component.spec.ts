import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliarHomeComponent } from './familiar-home.component';

describe('FamiliarHomeComponent', () => {
  let component: FamiliarHomeComponent;
  let fixture: ComponentFixture<FamiliarHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliarHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
