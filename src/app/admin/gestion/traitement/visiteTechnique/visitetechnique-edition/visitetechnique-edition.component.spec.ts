import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitetechniqueEditionComponent } from './visitetechnique-edition.component';

describe('VisitetechniqueEditionComponent', () => {
  let component: VisitetechniqueEditionComponent;
  let fixture: ComponentFixture<VisitetechniqueEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitetechniqueEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitetechniqueEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
