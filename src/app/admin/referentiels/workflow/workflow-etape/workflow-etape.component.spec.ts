import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowEtapeComponent } from './workflow-etape.component';

describe('WorkflowEtapeComponent', () => {
  let component: WorkflowEtapeComponent;
  let fixture: ComponentFixture<WorkflowEtapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowEtapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowEtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
