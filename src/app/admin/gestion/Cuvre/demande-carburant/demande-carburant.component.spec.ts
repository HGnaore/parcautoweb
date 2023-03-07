import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeCarburantComponent } from './demande-carburant.component';

describe('DemandeCarburantComponent', () => {
  let component: DemandeCarburantComponent;
  let fixture: ComponentFixture<DemandeCarburantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeCarburantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
