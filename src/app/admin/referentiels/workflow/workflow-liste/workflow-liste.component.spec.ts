import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowListeComponent } from './workflow-liste.component';

describe('WorkflowListeComponent', () => {
  let component: WorkflowListeComponent;
  let fixture: ComponentFixture<WorkflowListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
