import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeVehiculeComponent } from './demande-vehicule.component';

describe('DemandeVehiculeComponent', () => {
  let component: DemandeVehiculeComponent;
  let fixture: ComponentFixture<DemandeVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
