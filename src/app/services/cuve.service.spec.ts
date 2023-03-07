import { TestBed } from '@angular/core/testing';

import { CuveService } from './cuve.service';

describe('CuveService', () => {
  let service: CuveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
