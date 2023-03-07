import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDemandeVehiculeComponent } from './create-demande-vehicule.component';

describe('CreateDemandeVehiculeComponent', () => {
  let component: CreateDemandeVehiculeComponent;
  let fixture: ComponentFixture<CreateDemandeVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDemandeVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDemandeVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
