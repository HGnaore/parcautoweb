import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationVehiculeComponent } from './modification-vehicule.component';

describe('ModificationVehiculeComponent', () => {
  let component: ModificationVehiculeComponent;
  let fixture: ComponentFixture<ModificationVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
