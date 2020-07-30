import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliarUserComponent } from './familiar-user.component';

describe('FamiliarUserComponent', () => {
  let component: FamiliarUserComponent;
  let fixture: ComponentFixture<FamiliarUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliarUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
