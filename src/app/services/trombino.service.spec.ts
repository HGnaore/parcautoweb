import { TestBed } from '@angular/core/testing';

import { TrombinoService } from './trombino.service';

describe('TrombinoService', () => {
  let service: TrombinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrombinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
