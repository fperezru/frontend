import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDiarioComponent } from './editor-diario.component';

describe('EditorDiarioComponent', () => {
  let component: EditorDiarioComponent;
  let fixture: ComponentFixture<EditorDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
