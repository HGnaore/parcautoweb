import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditionComponent } from './location-edition.component';

describe('LocationEditionComponent', () => {
  let component: LocationEditionComponent;
  let fixture: ComponentFixture<LocationEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
