import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeEditionComponent } from './vehicule-edition.component';

describe('VehiculeEditionComponent', () => {
  let component: VehiculeEditionComponent;
  let fixture: ComponentFixture<VehiculeEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculeEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
