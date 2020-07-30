import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFamiliarComponent } from './registro-familiar.component';

describe('RegistroFamiliarComponent', () => {
  let component: RegistroFamiliarComponent;
  let fixture: ComponentFixture<RegistroFamiliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroFamiliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
