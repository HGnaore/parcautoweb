import { TestBed } from '@angular/core/testing';

import { EnergieService } from './energie.service';

describe('EnergieService', () => {
  let service: EnergieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
