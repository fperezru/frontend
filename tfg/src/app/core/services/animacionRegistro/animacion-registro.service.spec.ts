import { TestBed } from '@angular/core/testing';

import { AnimacionRegistroService } from './animacion-registro.service';

describe('AnimacionRegistroService', () => {
  let service: AnimacionRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimacionRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
