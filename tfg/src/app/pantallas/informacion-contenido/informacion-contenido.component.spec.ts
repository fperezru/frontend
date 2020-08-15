import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionContenidoComponent } from './informacion-contenido.component';

describe('InformacionContenidoComponent', () => {
  let component: InformacionContenidoComponent;
  let fixture: ComponentFixture<InformacionContenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionContenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
