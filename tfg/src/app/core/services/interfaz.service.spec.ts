import { TestBed } from '@angular/core/testing';

import { InterfazService } from './interfaz.service';

describe('InterfazService', () => {
  let service: InterfazService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfazService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
