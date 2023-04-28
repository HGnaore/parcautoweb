import { TestBed } from '@angular/core/testing';

import { CartecarburantService } from './cartecarburant.service';

describe('CartecarburantService', () => {
  let service: CartecarburantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartecarburantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
