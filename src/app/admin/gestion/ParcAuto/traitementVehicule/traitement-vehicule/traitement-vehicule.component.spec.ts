import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementVehiculeComponent } from './traitement-vehicule.component';

describe('TraitementVehiculeComponent', () => {
  let component: TraitementVehiculeComponent;
  let fixture: ComponentFixture<TraitementVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitementVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
