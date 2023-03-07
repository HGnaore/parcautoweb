import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotationCarburantComponent } from './dotation-carburant.component';

describe('DotationCarburantComponent', () => {
  let component: DotationCarburantComponent;
  let fixture: ComponentFixture<DotationCarburantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotationCarburantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotationCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
