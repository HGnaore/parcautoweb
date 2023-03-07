import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationVehiculeComponent } from './validation-vehicule.component';

describe('ValidationVehiculeComponent', () => {
  let component: ValidationVehiculeComponent;
  let fixture: ComponentFixture<ValidationVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
