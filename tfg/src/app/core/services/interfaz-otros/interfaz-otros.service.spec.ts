import { TestBed } from '@angular/core/testing';

import { InterfazOtrosService } from './interfaz-otros.service';

describe('InterfazOtrosService', () => {
  let service: InterfazOtrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfazOtrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
