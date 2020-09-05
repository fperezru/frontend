import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliarRecuerdosComponent } from './familiar-recuerdos.component';

describe('FamiliarRecuerdosComponent', () => {
  let component: FamiliarRecuerdosComponent;
  let fixture: ComponentFixture<FamiliarRecuerdosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliarRecuerdosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliarRecuerdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
