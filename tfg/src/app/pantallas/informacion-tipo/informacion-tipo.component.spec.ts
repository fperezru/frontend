import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionTipoComponent } from './informacion-tipo.component';

describe('InformacionTipoComponent', () => {
  let component: InformacionTipoComponent;
  let fixture: ComponentFixture<InformacionTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
