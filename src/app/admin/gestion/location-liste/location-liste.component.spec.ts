import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationListeComponent } from './location-liste.component';

describe('LocationListeComponent', () => {
  let component: LocationListeComponent;
  let fixture: ComponentFixture<LocationListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
