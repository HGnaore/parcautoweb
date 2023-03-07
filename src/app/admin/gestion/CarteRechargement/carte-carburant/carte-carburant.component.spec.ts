import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteCarburantComponent } from './carte-carburant.component';

describe('CarteCarburantComponent', () => {
  let component: CarteCarburantComponent;
  let fixture: ComponentFixture<CarteCarburantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteCarburantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
