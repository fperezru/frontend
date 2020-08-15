import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaLocalizacionComponent } from './mapa-localizacion.component';

describe('MapaLocalizacionComponent', () => {
  let component: MapaLocalizacionComponent;
  let fixture: ComponentFixture<MapaLocalizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaLocalizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaLocalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
