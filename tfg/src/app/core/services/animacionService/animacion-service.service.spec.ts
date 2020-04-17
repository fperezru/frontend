import { TestBed } from '@angular/core/testing';

import { AnimacionServiceService } from './animacion-service.service';

describe('AnimacionServiceService', () => {
  let service: AnimacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
