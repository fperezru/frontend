import { TestBed } from '@angular/core/testing';

import { InterfazPersonasService } from './interfaz-personas.service';

describe('InterfazPersonasService', () => {
  let service: InterfazPersonasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfazPersonasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
