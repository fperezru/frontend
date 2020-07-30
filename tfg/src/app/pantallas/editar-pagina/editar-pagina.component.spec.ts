import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPaginaComponent } from './editar-pagina.component';

describe('EditarPaginaComponent', () => {
  let component: EditarPaginaComponent;
  let fixture: ComponentFixture<EditarPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
