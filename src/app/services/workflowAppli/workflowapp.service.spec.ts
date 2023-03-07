import { TestBed } from '@angular/core/testing';

import { WorkflowappService } from './workflowapp.service';

describe('WorkflowappService', () => {
  let service: WorkflowappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
