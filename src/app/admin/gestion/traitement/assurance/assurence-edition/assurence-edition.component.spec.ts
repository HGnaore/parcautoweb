import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssurenceEditionComponent } from './assurence-edition.component';

describe('AssurenceEditionComponent', () => {
  let component: AssurenceEditionComponent;
  let fixture: ComponentFixture<AssurenceEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssurenceEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssurenceEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
