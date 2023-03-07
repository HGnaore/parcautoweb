import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationVehiculeComponent } from './consultation-vehicule.component';

describe('ConsultationVehiculeComponent', () => {
  let component: ConsultationVehiculeComponent;
  let fixture: ComponentFixture<ConsultationVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
