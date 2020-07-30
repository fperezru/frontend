import { TestBed } from '@angular/core/testing';

import { GuadAdminService } from './guad-admin.service';

describe('GuadAdminService', () => {
  let service: GuadAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuadAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
