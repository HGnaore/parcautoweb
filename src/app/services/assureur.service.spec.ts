import { TestBed } from '@angular/core/testing';

import { AssureurService } from './assureur.service';

describe('AssureurService', () => {
  let service: AssureurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssureurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
