import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionVehiculeListeComponent } from './fonction-vehicule-liste.component';

describe('FonctionVehiculeListeComponent', () => {
  let component: FonctionVehiculeListeComponent;
  let fixture: ComponentFixture<FonctionVehiculeListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FonctionVehiculeListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FonctionVehiculeListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
