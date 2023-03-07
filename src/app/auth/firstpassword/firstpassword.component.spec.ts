import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstpasswordComponent } from './firstpassword.component';

describe('FirstpasswordComponent', () => {
  let component: FirstpasswordComponent;
  let fixture: ComponentFixture<FirstpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
