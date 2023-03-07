import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowValidateurComponent } from './workflow-validateur.component';

describe('WorkflowValidateurComponent', () => {
  let component: WorkflowValidateurComponent;
  let fixture: ComponentFixture<WorkflowValidateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowValidateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowValidateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
