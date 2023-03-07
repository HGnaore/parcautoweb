import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovisionnerCarteComponent } from './approvisionner-carte.component';

describe('ApprovisionnerCarteComponent', () => {
  let component: ApprovisionnerCarteComponent;
  let fixture: ComponentFixture<ApprovisionnerCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovisionnerCarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovisionnerCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
