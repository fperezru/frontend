import { TestBed } from '@angular/core/testing';

import { InterfazViajesService } from './interfaz-viajes.service';

describe('InterfazViajesService', () => {
  let service: InterfazViajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfazViajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
