import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentEditionComponent } from './accident-edition.component';

describe('AccidentEditionComponent', () => {
  let component: AccidentEditionComponent;
  let fixture: ComponentFixture<AccidentEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
