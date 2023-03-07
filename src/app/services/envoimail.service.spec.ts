import { TestBed } from '@angular/core/testing';

import { EnvoimailService } from './envoimail.service';

describe('EnvoimailService', () => {
  let service: EnvoimailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvoimailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
